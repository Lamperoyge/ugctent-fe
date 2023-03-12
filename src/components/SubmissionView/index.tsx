import { useEffect, useState } from 'react';
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
import CreateSubmission from 'components/Submissions';

const SubmissionView = ({ submissionId, isOpen, onClose, jobCreator }) => {
  const {
    submission,
    submissionLoading,
    getSubmission,
    approveJobSubmission,
    rejectJobSubmission,
  } = useSubmission();

  const [isCreateSubmissionOpen, setIsCreateSubmissionOpen] = useState(false);

  useEffect(() => {
    if (submissionId && isOpen) getSubmission(submissionId);
  }, [submissionId, isOpen]);
  const { openConfirmModal, ConfirmModal } = useConfirmModal();
  const { user } = useAuth();
  if (submissionLoading && !submission) return <LoadingState />;
  if (!submission) return null;

  const JOB_CREATOR_ACTIONS = [
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

  const SUB_CREATOR_ACTIONS = [
    {
      label: 'Edit Submission',
      action: () => setIsCreateSubmissionOpen(true),
      version: 'grey',
    },
  ];

  const ACTIONS = user?._id === jobCreator?.userId ? JOB_CREATOR_ACTIONS : SUB_CREATOR_ACTIONS;
  const displayActions = [
    JOB_SUBMISSION_STATUS.IN_REVIEW,
    JOB_SUBMISSION_STATUS.REQUESTED_CHANGES,
  ].includes(submission?.status)
  

  return (
    <>
      <ConfirmModal />
      {isCreateSubmissionOpen && <CreateSubmission 
      onClose={() => setIsCreateSubmissionOpen(false)}
      jobId={submission?.job?._id} existingSubmission={submission} hideButton isDefaultOpen={isCreateSubmissionOpen}/>}
      <Modal
        opened={isOpen && !isCreateSubmissionOpen}
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

      </Modal>
    </>
  );
};

export default SubmissionView;
