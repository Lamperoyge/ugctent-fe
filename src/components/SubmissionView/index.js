import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  InvalidApplication,
  LoadingState,
} from 'components/ApplicationView/Helpers';
import Link from 'next/link';
import ProfilePicture from 'components/ProfilePicture';
import Comments from 'components/Comments';
import {
  COMMENT_ENTITY_TYPES,
  JOB_SUBMISSION_STATUS,
  SUBMISSION_STATUS_COLORS,
  SUBMISSION_STATUS_LABELS,
} from 'utils/constants';
import { useAuth } from 'hooks';
import { useSubmission } from 'hooks/submissions';
import { Modal, Button, Group } from '@mantine/core';
import { LinkIcon } from '@heroicons/react/outline';

const SubmissionView = ({ submissionId, isOpen, onClose }) => {
  const {
    submission,
    submissionError,
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

  const borderColor = `border-${statusColor}-400`;

  const textColor = `text-${statusColor}-400`;

  return (
    <>
      <Modal
        opened={isOpen}
        padding='xl'
        overlayOpacity={0.55}
        lockScroll={true}
        overlayBlur={3}
        onClose={onClose}
        title={'View submission'}
      >
        <div className='relative h-full'>
          <section className='py-10 flex flex-col gap-4 h-full overflow-auto relative'>
            <div className='flex flex-col gap-4 w-full'>
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
