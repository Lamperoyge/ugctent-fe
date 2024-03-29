import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  InvalidApplication,
  LoadingState,
} from 'components/ApplicationView/Helpers';
import Link from 'next/link';
import ProfilePicture from 'components/ProfilePicture';
import ApplicationDataViewPanel from 'components/ApplicationDataViewPanel';
import Comments from 'components/Comments';
import {
  COMMENT_ENTITY_TYPES,
  JOB_APPLICATION_PAYMENT_STATUS,
} from 'utils/constants';
import { useJobApplications } from 'hooks';
import { GET_PAYMENT_INTENT_INFO } from 'graphql/queries';
import {
  JOB_APPLICATION_STATUS,
  JOB_APPLICATION_STATUS_COLORS,
  JOB_APPLICATION_STATUS_LABELS,
} from 'utils/constants';
import { useAuth } from 'hooks';
import StripeComponent from 'components/Stripe';
import { useLazyQuery, useQuery } from '@apollo/client';
import StatusChip from 'components/StatusChip';
import PanelContainer from 'components/PanelContainer';
import { GET_USER_FEEDBACK } from 'graphql/queries/rating';
import { StarIcon } from '@heroicons/react/solid';
import { LightSpinner } from 'components/Shared/Spinner';

function ApplicationHeader({ application }) {
  const { user }: any = useAuth();
  const [clientSecret, setClientSecret] = useState(false);

  const hasRightForActions =
    application.status === JOB_APPLICATION_STATUS.IN_REVIEW &&
    user?._id !== application?.creator?.userId &&
    application?.paymentStatus !== JOB_APPLICATION_PAYMENT_STATUS.PAID;

  const { rejectJobApplication, getPaymentIntent, approveJobApplication } =
    useJobApplications();

  const handleApprove = async () => {
    if (application.creator?.taxId) {
      const secret = await getPaymentIntent(application._id);
      setClientSecret(secret);
      return;
    }
    return approveJobApplication({
      variables: { jobApplicationId: application._id },
    });
  };
  const handleReject = () =>
    rejectJobApplication({ variables: { jobApplicationId: application._id } });

  const statusColor = JOB_APPLICATION_STATUS_COLORS[application.status];

  const borderColor = `border-${statusColor}-400`;

  const textColor = `text-${statusColor}-400`;

  const onClose = () => setClientSecret(false);

  const redirectStatus = new URLSearchParams(window.location.search).get(
    'redirect_status'
  );

  const isPaymentLoading =
    redirectStatus === 'succeeded' &&
    application?.paymentStatus !== JOB_APPLICATION_PAYMENT_STATUS.PAID;

  return (
    <div className='mx-auto px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:px-8'>
      <div className='flex items-center space-x-5'>
        <div className='flex-shrink-0'>
          <div className='relative'>
            <ProfilePicture src={application.creator.profilePicture} />
            <span
              className='absolute inset-0 shadow-inner rounded-full'
              aria-hidden='true'
            />
          </div>
        </div>
        <div>
          <span className='items-center justify-start gap-2'>
            <h1 className='text-2xl font-bold text-gray-900'>
              {application.creator.firstName} {application.creator.lastName}
            </h1>
            <Link
              href={`/profile/${application.creator.userId}`}
              className='text-sm font-medium text-secondary hover:text-primary'
            >
              View profile
            </Link>
          </span>
          <p className='text-sm font-medium text-gray-500'>
            Applied for{' '}
            <Link
              href={`/projects/${application.job._id}`}
              passHref
              className='text-gray-900'
            >
              {application.job.title}
            </Link>{' '}
            on{' '}
            <time dateTime='2020-08-25'>
              {new Date(
                new Date(parseInt(application.createdAt, 10))
              ).toLocaleDateString()}
            </time>
          </p>
          <p className='text-sm py-2 text-gray-600'>
            <b>VAT ID</b>:{' '}
            {application?.creator?.taxId ||
              'This applicant does not have a VAT ID associated. You will need to handle all the payment details off platform.'}
          </p>
        </div>
      </div>
      {!hasRightForActions &&
        JOB_APPLICATION_PAYMENT_STATUS.PROCESSING !==
          application?.paymentStatus && (
          // <div className='mt-5 flex lg:mt-0 lg:ml-4'>
          //   <button
          //     className={`px-4 py-2 bg-transparent border-2 rounded-md ${borderColor} ${textColor}`}
          //     disabled
          //   >
          //     {JOB_APPLICATION_STATUS_LABELS[application.status]}
          //   </button>
          // </div>
          <StatusChip status={application.status} />
        )}
      {![
        JOB_APPLICATION_PAYMENT_STATUS.PAID,
        JOB_APPLICATION_PAYMENT_STATUS.UNPAID,
      ].includes(application?.paymentStatus) &&
        hasRightForActions && (
          <div className='mt-5 flex lg:mt-0 lg:ml-4'>
            <button
              className={`px-4 py-2 bg-transparent border-2 rounded-md ${borderColor} ${textColor}`}
              disabled
            >
              {JOB_APPLICATION_STATUS_LABELS[application.status]}
            </button>
          </div>
        )}

      {!!clientSecret && (
        <StripeComponent
          clientSecret={clientSecret}
          application={application}
          handleClose={onClose}
        />
      )}
      {hasRightForActions &&
        !clientSecret &&
        (isPaymentLoading ? (
          <LightSpinner />
        ) : (
          <div className='mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3'>
            <button
              type='button'
              onClick={handleReject}
              className='inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500'
            >
              Reject
            </button>
            <button
              type='button'
              onClick={handleApprove}
              className='inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500'
            >
              Accept
            </button>
          </div>
        ))}
    </div>
  );
}

export default function ApplicationView() {
  const router = useRouter();

  const {
    getJobApplicationById,
    jobApplication,
    jobApplicationError: error,
    jobApplicationLoading: loading,
    jobApplicationStartPolling,
    jobApplicationStopPolling,
  } = useJobApplications();

  useEffect(() => {
    const isPaymentIntent = new URLSearchParams(window.location.search).get(
      'payment_intent'
    );
    if (isPaymentIntent) {
      getJobApplicationById({
        variables: {
          id: router.query.applicationId,
        },
      }).then(({ data }) => {
        if (
          data?.getJobApplicationById?.paymentStatus !==
            JOB_APPLICATION_PAYMENT_STATUS.PAID ||
          (data?.getJobApplicationById?.paymentStatus ===
            JOB_APPLICATION_PAYMENT_STATUS.PAID &&
            data?.getJobApplicationById?.status ===
              JOB_APPLICATION_STATUS.IN_REVIEW)
        ) {
          jobApplicationStartPolling(800);
        }
      });
    }
    return () => jobApplicationStopPolling();
  }, [router.query?.applicationId]);

  useEffect(() => {
    if (
      jobApplication?.paymentStatus !== JOB_APPLICATION_PAYMENT_STATUS.UNPAID
    ) {
      jobApplicationStopPolling();
    }
  });

  useEffect(() => {
    if (router.query?.applicationId) {
      getJobApplicationById({
        variables: {
          id: router.query.applicationId,
        },
      });
    }
  }, [router.query?.applicationId]);

  const { data: userFeedback } = useQuery(GET_USER_FEEDBACK, {
    fetchPolicy: 'network-only',
    variables: {
      userId: jobApplication?.getJobApplicationById?.creator.userId,
      limit: 3,
      offset: 0,
    },
    skip: !jobApplication?.getJobApplicationById?.creator.userId,
  });

  if (error) {
    return <InvalidApplication jobId={router.query.jobId} />;
  }

  if (loading && !jobApplication) return <LoadingState />;
  if (!jobApplication) return null;

  const application = jobApplication.getJobApplicationById;

  const applicationPanelData = [
    {
      label: 'Application for',
      value: application.job.title,
      type: 'half',
    },
    {
      label: 'Applicant price',
      value: application.price,
      type: 'half',
    },
    {
      label: 'Initial price',
      value: application.job.price,
      type: 'half',
    },
    {
      label: 'Project description',
      value: application.job.description,
      type: 'half',
    },

    {
      label: 'Message',
      value: application.message,
      type: 'full',
    },
  ];

  const isApplicationInReview =
    application.status === JOB_APPLICATION_STATUS.IN_REVIEW;
  return (
    <>
      <div className='min-h-full'>
        <main className='py-10'>
          <ApplicationHeader application={application} />

          <div
            className={`mt-8 mx-auto grid grid-cols-1 gap-6 sm:px-6 lg:grid-flow-col-dense`}
          >
            <div className='space-y-6 lg:col-start-1 lg:col-span-2'>
              {/* Description list*/}
              <ApplicationDataViewPanel
                application={application}
                header={'Application'}
                subHeader={'Message, offer'}
                fields={applicationPanelData}
              />
              {/* Comments*/}
              <div className='flex gap-8 flex-wrap sm:flex-nowrap'>
                <div className='flex-grow'>
                  <Comments
                    entityId={router.query.applicationId}
                    disabled={!isApplicationInReview}
                    entityType={COMMENT_ENTITY_TYPES.JOB_APPLICATION}
                  />
                </div>
                <section
                  aria-labelledby='applicant-information-title'
                  className='flex-grow'
                >
                  <div className='bg-white shadow sm:rounded-lg'>
                    <div className='px-4 py-5 sm:px-6'>
                      <h2
                        id='applicant-information-title'
                        className='text-sm font-medium text-gray-500'
                      >
                        Testimonials
                      </h2>
                    </div>
                    <div className='border-t border-gray-200 px-4 py-5 sm:px-6 w-full'>
                      <div className='flex gap-4 w-full flex-col'>
                        {!userFeedback?.getFeedbackForUser?.length
                          ? 'No feedback yet'
                          : ''}
                        {userFeedback?.getFeedbackForUser?.map(
                          (feedback, idx) =>
                            feedback?.note ? (
                              <div
                                key={feedback._id}
                                className='w-full justify-start items-start flex-col border-gray-300 border p-2 rounded text-gray-600'
                              >
                                <span className='font-semibold text-sm'>
                                  {feedback?.note}
                                </span>
                                <div className='flex items-center gap-2'>
                                  <StarIcon className='h-3' />
                                  <span className='text-gray-400 text-sm'>
                                    {feedback?.rate} / 5
                                  </span>
                                </div>
                              </div>
                            ) : null
                        )}
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
