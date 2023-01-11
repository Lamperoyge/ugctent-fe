import { useEffect } from 'react';
import {
  LoadingState,
} from 'components/ApplicationView/Helpers';
import Comments from 'components/Comments';
import {
  COMMENT_ENTITY_TYPES,
  JOB_SUBMISSION_STATUS,
  SUBMISSION_STATUS_COLORS,
  SUBMISSION_STATUS_LABELS,
} from 'utils/constants';
import { useSubmission } from 'hooks/submissions';
import { Modal, Button } from '@mantine/core';
import { LinkIcon } from '@heroicons/react/outline';
import ViewAttachments from 'components/ViewAttachments';

const SubmissionView = ({ submissionId, isOpen, onClose }) => {
  const {
    submission,
    submissionLoading,
    getSubmission,
    approveJobSubmission,
  } = useSubmission();

  useEffect(() => {
    if (submissionId && isOpen) getSubmission(submissionId);
  }, [submissionId, isOpen]);

  if (submissionLoading && !submission) return <LoadingState />;
  if (!submission) return null;

  const statusColor = SUBMISSION_STATUS_COLORS[submission?.status];

  return (
    <>
      <Modal
        opened={isOpen}
        padding='xl'
        overlayOpacity={0.55}
        lockScroll={true}
        overlayBlur={3}
        onClose={onClose}
      >
        <div className='relative h-full'>
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
        )}
      </Modal>
    </>
  );
};

export default SubmissionView;
