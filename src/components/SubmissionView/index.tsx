import { useEffect } from 'react';
import { LoadingState } from 'components/ApplicationView/Helpers';
import Comments from 'components/Comments';
import {
  COMMENT_ENTITY_TYPES,
  JOB_STATUS,
  JOB_SUBMISSION_STATUS,
} from 'utils/constants';
import { useSubmission } from 'hooks/submissions';
import { Modal, Button, Text } from '@mantine/core';
import { LinkIcon } from '@heroicons/react/outline';
import ViewAttachments from 'components/ViewAttachments';
import StatusChip from 'components/StatusChip';
import { useConfirmModal } from 'components/Shared/ConfirmModal';
import { useAuth } from 'hooks';

const SubmissionView = ({ submissionId, isOpen, onClose }) => {
  const {
    submission,
    submissionLoading,
    getSubmission,
    approveJobSubmission,
    rejectJobSubmission,
  } = useSubmission();

  useEffect(() => {
    if (submissionId && isOpen) getSubmission(submissionId);
  }, [submissionId, isOpen]);
  const { openConfirmModal, ConfirmModal } = useConfirmModal();
  const { user } = useAuth();
  if (submissionLoading && !submission) return <LoadingState />;
  if (!submission) return null;

  const ACTIONS = [
    {
      label: 'Approve',
      action: () =>
        openConfirmModal({
          title: 'Approve Submission',
          children: (
            <Text size='sm'>
              Are you sure you want to approve this submission?
            </Text>
          ),
          labels: { confirm: 'Approve', cancel: 'Cancel' },
          onConfirm: () =>
            approveJobSubmission({
              variables: {
                submissionId,
              },
            }),
          confirmProps: {
            color: 'green',
            size: 'xs',
            radius: 'xl',
          },
          closeOnCancel: true,
          closeOnConfirm: true,
        }),
      version: 'green',
    },
    {
      label: 'Reject',
      action: () =>
        openConfirmModal({
          title: 'Reject Submission',
          children: (
            <Text size='sm'>
              Are you sure you want to reject this submission?
            </Text>
          ),
          confirmProps: {
            color: 'red',
            size: 'xs',
            radius: 'xl',
          },
          labels: { confirm: 'Reject', cancel: 'Cancel' },
          onConfirm: () =>
            rejectJobSubmission({
              variables: {
                submissionId,
              },
            }),
          closeOnCancel: true,
          closeOnConfirm: true,
        }),
      version: 'red',
    },
  ];

  const displayActions = [
    JOB_SUBMISSION_STATUS.IN_REVIEW,
    JOB_SUBMISSION_STATUS.REQUESTED_CHANGES,
  ].includes(submission?.status) &&
  user._id !== submission?.createdBy

  return (
    <>
      <ConfirmModal />
      <Modal
        opened={isOpen}
        padding='xl'
        overlayOpacity={0.55}
        lockScroll={true}
        overlayBlur={3}
        overflow='inside'
        onClose={onClose}
      >
        <div className='overflow-hidden bg-white shadow sm:rounded-lg'>
          <div className='px-4 py-5 sm:px-6'>
            <h3 className='text-lg font-medium leading-6 text-gray-900'>
              Submission
            </h3>
            <p className='mt-1 max-w-2xl text-sm text-gray-500'>
              Submission details.
            </p>
          </div>
          <div className='border-t border-gray-200'>
            <dl>
              <div className={`${displayActions ? 'bg-gray-50' : 'bg-white'} px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}>
                <dt className='text-sm font-medium text-gray-500'>Status</dt>
                <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                  <StatusChip status={submission?.status} />
                </dd>
              </div>

              {displayActions ? (
                <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                  <dt className='text-sm font-medium text-gray-500'>Actions</dt>
                  <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                    <div className='flex gap-4 align-center justify-start'>
                      {ACTIONS?.map((action, idx) => (
                        <Button
                          radius='xl'
                          size='xs'
                          key={idx}
                          variant='outline'
                          color={action.version}
                          onClick={action.action}
                          compact
                        >
                          {action.label}
                        </Button>
                      ))}
                    </div>
                  </dd>
                </div>
              ) : null}

              <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                <dt className='text-sm font-medium text-gray-500'>
                  Submitted by
                </dt>
                <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                  {submission?.creator?.firstName}{' '}
                  {submission?.creator?.lastName}
                </dd>
              </div>
              <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                <dt className='text-sm font-medium text-gray-500'>
                  Submission title
                </dt>
                <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                  {submission?.title}
                </dd>
              </div>
              <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                <dt className='text-sm font-medium text-gray-500'>
                  Submitted on
                </dt>
                <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                  {' '}
                  {new Date(
                    parseInt(submission?.createdAt, 10)
                  ).toLocaleDateString()}
                </dd>
              </div>
              <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                <dt className='text-sm font-medium text-gray-500'>
                  Description
                </dt>
                <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                  {submission?.description}
                </dd>
              </div>
              <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                <dt className='text-sm font-medium text-gray-500'>Links</dt>
                <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                  <ul
                    role='list'
                    className='divide-y divide-gray-200 rounded-md border border-gray-200'
                  >
                    {submission?.links?.map((link) => (
                      <li className='flex items-center justify-between py-3 pl-3 pr-4 text-sm'>
                        <div className='flex w-0 flex-1 items-center'>
                          <LinkIcon
                            className='h-5 w-5 flex-shrink-0 text-gray-400'
                            aria-hidden='true'
                          />
                          <span className='ml-2 w-0 flex-1 truncate'>
                            {link?.displayName}
                          </span>
                        </div>
                        <div className='ml-4 flex-shrink-0'>
                          <a
                            href={link?.url}
                            target='_blank'
                            rel='noreferrer'
                            className='font-medium text-indigo-600 hover:text-indigo-500'
                          >
                            Open
                          </a>
                        </div>
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
              <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                <dt className='text-sm font-medium text-gray-500'>
                  Attachments
                </dt>
                <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                  {submission?.attachments?.length ? (
                    <ViewAttachments attachments={submission?.attachments} />
                  ) : (
                    'No attachments'
                  )}
                </dd>
              </div>
              <Comments
                entityId={submission?._id}
                entityType={COMMENT_ENTITY_TYPES.SUBMISSION}
              />
            </dl>
          </div>
        </div>

        {/* <div className='relative h-full'>
          <section className='flex flex-col gap-4 h-full overflow-auto relative'>
            <div className='flex flex-col gap-4 w-full'>
                <dt className='text-md font-medium text-gray-500'>
                  Submitted by
                </dt>
                <div className="text-md font-small text-gray-800 flex gap-2 space-between items-center">
                  {submission.creator.profilePicture ? (
                    <img
                      className='h-12 w-12 rounded-full group-hover:opacity-75'
                      src={submission.creator.profilePicture}
                      alt=''
                    />
                  ) : (
                    <span className='inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100'>
                      <svg
                        className='h-full w-full text-gray-300'
                        fill='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path d='M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z' />
                      </svg>
                    </span>
                  )}
                  {`${submission?.creator?.firstName} ${submission?.creator?.lastName}`}
                </div>
              <div>

                <dt className='text-md font-medium text-gray-500'>
                  Submitted on
                </dt>
                <dd className='mt-1 text-md text-gray-800 font-small'>
                  {new Date(
                    parseInt(submission?.createdAt, 10)
                  ).toLocaleDateString()}
                </dd>
              </div>
              <div>
                <dt className='text-md font-medium text-gray-500'>Status</dt>
                <span
                  className={`inline-flex border border-${statusColor}-400 items-center px-3 py-0.5 rounded-full text-sm font-bold bg-${statusColor}-100 text-${statusColor}-800`}
                >
                  <svg
                    className={`-ml-1 mr-1.5 h-2 w-2 text-${statusColor}-400`}
                    fill='currentColor'
                    viewBox='0 0 8 8'
                  >
                    <circle cx={4} cy={4} r={3} />
                  </svg>
                  {SUBMISSION_STATUS_LABELS[submission.status]}{' '}
                </span>
              </div>
              <div>
                <dt className='text-md font-medium text-gray-500'>
                  Submission title
                </dt>
                <dd className='mt-1 text-lg text-gray-900 font-medium'>
                  {submission?.title}
                </dd>
              </div>
              <div>
                <dt className='text-md font-medium text-gray-500'>
                  Submission description
                </dt>
                <dd className='mt-1 text-lg text-gray-900 font-medium'>
                  {submission?.description}
                </dd>
              </div>
              <div>
                <dt className='text-md font-medium text-gray-500'>
                  Submission links
                </dt>
                {submission?.links?.map((link, index) => (
                  <dd
                    key={`${link?.url}-${index}`}
                    className='mt-1 text-lg text-blue-600 font-medium'
                  >
                    <a
                      href={link?.url}
                      target='_blank'
                      rel='noreferrer'
                      className='flex gap-2 items-center'
                    >
                      <LinkIcon className='h-5 w-5' /> {link?.displayName}
                    </a>
                  </dd>
                ))}
              </div>
              <div>
              <dt className="text-md font-medium text-gray-500">
                  Attachments
              </dt>
              <ViewAttachments attachments={submission?.attachments}/>
              </div>
            </div>
            <Comments
              entityId={submission?._id}
              entityType={COMMENT_ENTITY_TYPES.SUBMISSION}
            />
          </section>
        </div>
        {submission?.status !== JOB_SUBMISSION_STATUS.ACCEPTED && (
          <div className=''>
            <Button
              className='bg-red-300'
              onClick={() =>
                approveJobSubmission({
                  variables: {
                    submissionId: submission._id,
                  },
                })
              }
            >
              Accept
            </Button>
          </div>
        )} */}
      </Modal>
    </>
  );
};

export default SubmissionView;
