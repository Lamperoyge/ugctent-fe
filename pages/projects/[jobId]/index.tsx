/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { GET_JOB_BY_ID } from 'graphql/queries';
import { ARCHIVE_JOB, COMPLETE_JOB } from 'graphql/mutations';
import {
  BellIcon,
  CalendarIcon,
  ChatAltIcon,
  PencilIcon,
} from '@heroicons/react/solid';
import { useAuth } from 'hooks';
import Link from 'next/link';
import StatusChip from 'components/StatusChip';
import ViewAttachments from 'components/ViewAttachments';
import CreateJobApplication from 'components/CreateJobApplication';
import ApplicationsList from 'components/ApplicationsList';
import { JOB_STATUS } from 'utils/constants';
import CreateSubmission from 'components/Submissions';
import SubmissionsList from 'components/SubmissionsList';
import EditJob from 'components/EditJob';
import ProjectPageAsideContent from 'components/ProjectPageAsideContent';
import {
  CheckCircleIcon,
  CheckIcon,
  CurrencyDollarIcon,
  TrashIcon,
} from '@heroicons/react/outline';
import Skills from 'components/JobsPageComponents/skills';
import Category from 'components/JobsPageComponents/category';
import Assignee from 'components/JobsPageComponents/assignee';
import RatingPrompt from 'components/RatingPrompt';
import Chat from 'components/Chat';
import ManageInvoice from 'components/ManageInvoice';

export default function ProjectPage() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isFeedbackPromptOpen, setIsFeedbackPromptOpen] = useState(false);
  const [isCreateApplicationModalOpen, setIsCreateApplicationModalOpen] =
    useState(false);
  const router = useRouter();
  const [archiveJob] = useMutation(ARCHIVE_JOB, {
    refetchQueries: ['getJobById'],
  });

  const [completeJob] = useMutation(COMPLETE_JOB, {
    refetchQueries: ['getJobById'],
    onCompleted: () => {
      setIsFeedbackPromptOpen(true);
    },
  });
  const { user }: any = useAuth();
  const isStripeVerified = user?.isStripeVerified;
  const { data } = useQuery(GET_JOB_BY_ID, {
    variables: {
      id: router.query.jobId,
    },
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
    skip: !router?.query?.jobId,
  });

  if (!data?.getJobById) return null;

  const job = data?.getJobById;

  const canEdit =
    job?.creator?.userId === user?._id && job?.status === JOB_STATUS.CREATED;

  const canApply =
    job?.creator?.userId !== user?._id &&
    isStripeVerified &&
    job?.status === JOB_STATUS.CREATED;

  const canViewAssignedTask =
    job?.creator?.userId === user?._id || job?.assigneeId === user?._id;

  const canViewAssignedPerson =
    job?.creator?.userId === user?._id || job?.assigneeId === user?._id;

  const toggleCreateApplicationModal = () => {
    if (job?.userApplication?.hasUserApplied) {
      return router.push(
        `/projects/${job._id}/applications/${job?.userApplication?._id}`,
        undefined,
        { shallow: true }
      );
    } else {
      setIsCreateApplicationModalOpen((prevState) => !prevState);
    }
  };

  const canCompleteJob =
    job?.creator?.userId === user?._id &&
    job?.status === JOB_STATUS.IN_PROGRESS;

  const canArchive =
    job?.creator?.userId === user?._id && job?.status === JOB_STATUS.CREATED;

  // TODO Adrian : refactor, too much code

  const toggleEdit = () => setIsEditMode((prev) => !prev);

  const handleComplete = async () => {
    await completeJob({ variables: { jobId: job?._id } });
  };


  return (
    <>
      <RatingPrompt
        job={job}
        handleClose={() => setIsFeedbackPromptOpen(false)}
        opened={isFeedbackPromptOpen}
      />
      <CreateJobApplication
        opened={isCreateApplicationModalOpen}
        onClose={toggleCreateApplicationModal}
        job={job}
      />
      {isEditMode ? <EditJob job={job} onClose={toggleEdit} /> : null}
      <div className='w-full h-full'>
        <main className='flex-1'>
          <div className='py-8 xl:py-10'>
            <div className='max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 xl:max-w-5xl xl:grid xl:grid-cols-3'>
              <div className='xl:col-span-2 xl:pr-8 xl:border-r xl:border-gray-200'>
                <div>
                  <div>
                    <div className='md:flex md:items-center md:justify-between md:space-x-4 xl:border-b xl:pb-6'>
                      <div>
                        <h1 className='text-2xl font-bold text-gray-900'>
                          {job.title}
                        </h1>
                        <p className='mt-2 text-sm text-gray-500'>
                          created by{' '}
                          <Link
                            href={`/profile/${job.creator?.userId}`}
                            className='font-medium text-gray-900'
                          >
                            {job.creator?.firstName} {job.creator?.lastName}
                          </Link>
                        </p>
                      </div>
                      <div className='mt-4 flex space-x-3 md:mt-0'>
                        {canEdit && (
                          <button
                            type='button'
                            onClick={toggleEdit}
                            className='inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900'
                          >
                            <PencilIcon
                              className='-ml-1 mr-2 h-5 w-5 text-gray-400'
                              aria-hidden='true'
                            />
                            <span>Edit</span>
                          </button>
                        )}
        <ManageInvoice job={job}/>

                        {canArchive && (
                          <button
                            type='button'
                            onClick={() =>
                              archiveJob({ variables: { jobId: job?._id } })
                            }
                            className='inline-flex justify-center px-4 py-2 border border-red-400 shadow-sm text-sm font-medium rounded-md text-red-400 bg-white hover:bg-red-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-300'
                          >
                            <TrashIcon
                              className='-ml-1 mr-2 h-5 w-5 text-inherit'
                              aria-hidden='true'
                            />
                            <span>Archive</span>
                          </button>
                        )}
                        {canCompleteJob && (
                          <button
                            type='button'
                            onClick={handleComplete}
                            className='inline-flex justify-center px-10 py-2 items-center border border-transparent text-sm font-medium rounded-full text-white bg-green-500 hover:bg-green-400'
                          >
                            <CheckCircleIcon
                              className='-ml-1 mr-2 h-5 w-5 text-inherit'
                              aria-hidden='true'
                            />
                            <span>Mark job as complete</span>
                          </button>
                        )}
                        {canApply && (
                          <button
                            type='button'
                            onClick={toggleCreateApplicationModal}
                            className='inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-bold rounded-md text-white bg-secondary hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900'
                          >
                            <BellIcon
                              className='-ml-1 mr-2 h-5 w-5 text-white-400'
                              aria-hidden='true'
                            />
                            <span>
                              {job?.userApplication?.hasUserApplied
                                ? 'View application'
                                : 'Apply'}
                            </span>
                          </button>
                        )}
                        {!canApply &&
                          job?.creator?.userId !== user?._id &&
                          job?.status === JOB_STATUS.CREATED && (
                            <button
                              type='button'
                              className='inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-bold rounded-md text-white bg-secondary hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900'
                              onClick={() =>
                                router.push('/verify', undefined, {
                                  shallow: true,
                                })
                              }
                            >
                              Get verified
                            </button>
                          )}
                      </div>
                    </div>
                    <div className='py-3 xl:pt-6 xl:pb-0 flex flex-col gap-4'>
                      <h2 className='sr-only'>Description</h2>
                      <div className='prose max-w-none'>
                        <span className='text-sm text-gray-500'>
                          Description{' '}
                        </span>
                        <p>{job.description}</p>
                      </div>
                      {job.attachments?.length ? (
                        <div className='border-t py-4 flex flex-col gap-4'>
                          <span className='text-sm text-gray-500'>
                            Attachments{' '}
                          </span>

                          <ViewAttachments attachments={job.attachments} />
                        </div>
                      ) : null}
                      <Skills job={job} />
                    </div>
                  </div>
                </div>

                <div className='mt-8 py-4 border-t flex flex-col gap-4'>
                  {user?._id === job.creator?.userId && !job.assigneeId && (
                    <ApplicationsList jobId={job._id} />
                  )}
                  <div className='w-full flex justify-center items-start h-fit-content'>
                    {user?._id === job?.assigneeId &&
                      user?._id !== job?.creator?._id &&
                      [JOB_STATUS.IN_PROGRESS, JOB_STATUS.IN_REVIEW].includes(
                        job.status
                      ) && <CreateSubmission jobId={job._id} />}
                  </div>

                  <div className='w-full flex items-center justify-center'></div>
                  {canViewAssignedTask && job?.assigneeId && (
                    <SubmissionsList
                      jobId={job._id}
                      assignee={job.assigneeId}
                      jobCreator={job.creator}
                    />
                  )}
                </div>
              </div>
              <ProjectPageAsideContent
                job={job}
                canViewAssignedPerson={canViewAssignedPerson}
              >
                {canViewAssignedTask && job?.assigneeId && (
                  <div className='mt-8 w-full flex justify-center'>
                    <Chat job={job} />
                  </div>
                )}
              </ProjectPageAsideContent>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
