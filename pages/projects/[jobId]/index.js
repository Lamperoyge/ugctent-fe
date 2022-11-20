/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { GET_JOB_BY_ID } from 'graphql/queries';
import { Fragment } from 'react';
import {
  BellIcon,
  CalendarIcon,
  ChatAltIcon,
  PencilIcon,
  UserCircleIcon as UserCircleIconSolid,
} from '@heroicons/react/solid';
import { useAuth } from 'hooks';
import Link from 'next/link';
import StatusChip from 'components/StatusChip';
import ViewAttachments from 'components/ViewAttachments';
import CreateJobApplication from 'components/CreateJobApplication';
import ApplicationsList from 'components/ApplicationsList';
import { JOB_APPLICATION_PAYMENT_STATUS, JOB_STATUS } from 'utils/constants';
import CreateSubmission from 'components/Submissions';
import SubmissionsList from 'components/SubmissionsList';
import ProfilePicture from 'components/ProfilePicture';
import { CurrencyDollarIcon } from '@heroicons/react/outline';
export default function ProjectPage() {
  const [isCreateApplicationModalOpen, setIsCreateApplicationModalOpen] =
    useState(false);
  const router = useRouter();
  const { user, isStripeVerified } = useAuth();
  const { data } = useQuery(GET_JOB_BY_ID, {
    variables: {
      id: router.query.jobId,
    },
    skip: !router?.query?.jobId,
  });

  if (!data?.getJobById) return null;

  const job = data?.getJobById;

  const canEdit = job?.creator?.userId === user?._id;

  const canApply =
    job?.creator?.userId !== user?._id &&
    isStripeVerified &&
    job?.status === JOB_STATUS.CREATED;

  const canViewAssignedTask =
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

  console.log(job);
  return (
    <>
      <CreateJobApplication
        opened={isCreateApplicationModalOpen}
        onClose={toggleCreateApplicationModal}
        job={job}
      />
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
                            className='inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900'
                          >
                            <PencilIcon
                              className='-ml-1 mr-2 h-5 w-5 text-gray-400'
                              aria-hidden='true'
                            />
                            <span>Edit</span>
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
                    <aside className='mt-8 xl:hidden'>
                      <h2 className='sr-only'>Details</h2>
                      <div className='space-y-5'>
                        <div className='ml-2 flex-shrink-0 flex'>
                          <StatusChip status={job.status} />
                        </div>
                        <div className='flex items-center space-x-2'>
                          <ChatAltIcon
                            className='h-5 w-5 text-gray-400'
                            aria-hidden='true'
                          />
                          <span className='text-gray-900 text-sm font-medium'>
                            {job?.applicationsCount || 0} applications
                          </span>
                        </div>
                        <div className='flex items-center space-x-2'>
                          <CalendarIcon
                            className='h-5 w-5 text-gray-400'
                            aria-hidden='true'
                          />
                          <span className='text-gray-900 text-sm font-medium'>
                            Created on{' '}
                            <time dateTime='2020-12-02'>
                              {new Date(
                                parseInt(job.createdAt, 10)
                              ).toLocaleDateString()}
                            </time>
                          </span>
                        </div>
                      </div>
                      <div className='mt-6 border-t border-b border-gray-200 py-6 space-y-8'>
                        <div>
                          <h2 className='text-sm font-medium text-gray-500'>
                            Assignee
                          </h2>
                          <ul className='mt-3 space-y-3'>
                            <li className='flex justify-start'>
                              <a
                                href='#'
                                className='flex items-center space-x-3'
                              >
                                <div className='flex-shrink-0'>
                                  <img
                                    className='h-5 w-5 rounded-full'
                                    src='https://images.unsplash.com/photo-1520785643438-5bf77931f493?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80'
                                    alt=''
                                  />
                                </div>
                                <div className='text-sm font-medium text-gray-900'>
                                  {job?.assignee
                                    ? `${job?.assignee?.firstName} ${job?.assignee?.lastName}`
                                    : 'Not assigned'}
                                </div>
                              </a>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <h2 className='text-sm font-medium text-gray-500'>
                            Tags
                          </h2>
                          <ul role='list' className='mt-2 leading-8'>
                            <li className='inline'>
                              <a
                                href='#'
                                className='relative inline-flex items-center rounded-full border border-gray-300 px-3 py-0.5'
                              >
                                <div className='absolute flex-shrink-0 flex items-center justify-center'>
                                  <span
                                    className='h-1.5 w-1.5 rounded-full bg-rose-500'
                                    aria-hidden='true'
                                  />
                                </div>
                                <div className='ml-3.5 text-sm font-medium text-gray-900'>
                                  Bug
                                </div>
                              </a>{' '}
                            </li>
                            <li className='inline'>
                              <a
                                href='#'
                                className='relative inline-flex items-center rounded-full border border-gray-300 px-3 py-0.5'
                              >
                                <div className='absolute flex-shrink-0 flex items-center justify-center'>
                                  <span
                                    className='h-1.5 w-1.5 rounded-full bg-indigo-500'
                                    aria-hidden='true'
                                  />
                                </div>
                                <div className='ml-3.5 text-sm font-medium text-gray-900'>
                                  Accessibility
                                </div>
                              </a>{' '}
                            </li>
                          </ul>
                        </div>
                      </div>
                    </aside>
                    <div className='py-3 xl:pt-6 xl:pb-0'>
                      <h2 className='sr-only'>Description</h2>
                      <div className='prose max-w-none'>
                        <p>{job.description}</p>
                      </div>
                      <ViewAttachments attachments={job.attachments} />
                    </div>
                  </div>
                </div>
                {user?._id === job.creator?.userId && !job.assigneeId && (
                    <ApplicationsList jobId={job._id} />
                  )}
                {canViewAssignedTask && (
                  <SubmissionsList jobId={job._id} assignee={job.assigneeId}/>
                )}
                <div className='w-full flex justify-center items-center h-full'>
                  {user?._id === job?.assigneeId &&
                    user?._id !== job?.creator?._id && (
                      <CreateSubmission jobId={job._id} />
                    )}
                </div>
              </div>
              <aside className='hidden xl:block xl:pl-8'>
                <h2 className='sr-only'>Details</h2>
                <div className='space-y-5'>
                  <div className='flex items-center space-x-2'>
                    <StatusChip status={job.status} />
                  </div>
                  <div className='flex items-center space-x-2'>
                    <ChatAltIcon
                      className='h-5 w-5 text-gray-400'
                      aria-hidden='true'
                    />
                    <span className='text-gray-900 text-sm font-medium'>
                      {job?.applicationsCount || 0} applications
                    </span>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <CalendarIcon
                      className='h-5 w-5 text-gray-400'
                      aria-hidden='true'
                    />
                    <span className='text-gray-900 text-sm font-medium'>
                      Created on{' '}
                      <time dateTime='2020-12-02'>
                        {new Date(parseInt(job.createdAt)).toLocaleDateString()}
                      </time>
                    </span>
                  </div>
                  {job.createdAt !== job.updatedAt && (
                    <div className='flex items-center space-x-2'>
                      <CalendarIcon
                        className='h-5 w-5 text-gray-400'
                        aria-hidden='true'
                      />
                      <span className='text-primaryOrange text-sm font-medium'>
                        Last update{' '}
                        <time dateTime='2020-12-02'>
                          {new Date(
                            parseInt(job.updatedAt)
                          ).toLocaleDateString()}
                        </time>
                      </span>
                    </div>
                  )}
                  <div className="flex items-center space-x-2">
                            <CurrencyDollarIcon className="h-5 w-5 text-gray-400" aria-hidden="true"/>
                            <span className="text-gray-900 text-sm font-medium">
                              {[JOB_STATUS.IN_PROGRESS, JOB_STATUS.IN_REVIEW, JOB_STATUS.COMPLETED].includes(job?.status) ? "Paid" : "Not paid"} 
                            </span> 
                            <span className='text-gray-900 text-sm font-medium'>
                      {job?.price} RON
                    </span>

                  </div>
                </div>
                <div className='mt-6 border-t border-gray-200 py-6 space-y-8'>
                  <div>
                    <h2 className='text-sm font-medium text-gray-500'>
                      Assignee
                    </h2>
                    <ul className='mt-3 space-y-3'>
                      <li className='flex justify-start'>
                        <div className='flex items-center space-x-3'>
                            {job?.assignee ?                           <div className='flex-shrink-0'>
                            <ProfilePicture src={job?.assignee?.profilePicture} size="h-10 w-10"/>
                          </div>
 : null}
                          <div className='text-sm font-medium text-gray-900'>
                            {job?.assignee
                              ? `${job?.assignee?.firstName} ${job?.assignee?.lastName}`
                              : 'Not assigned'}
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h2 className='text-sm font-medium text-gray-500'>
                      Skills
                    </h2>
                    <ul className='flex mt-2 leading-8 flex-wrap gap-2'>
                      {job.skills?.map((skill) => (
                        <li
                          className='border rounded-full py-1 px-3 text-xs mr-2 font-semibold text-white bg-primaryOrange items-center'
                          key={skill._id}
                        >
                          <span className='block truncate'>{skill.label}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h2 className='text-sm font-medium text-gray-500'>
                      Category
                    </h2>
                    <ul className='flex mt-2 leading-8 flex-wrap gap-2'>
                      <li>
                        <li className='border rounded-full py-1 px-3 text-xs mr-2 font-semibold text-white bg-green-700 items-center'>
                          <span className='block truncate'>
                            {job.category?.label}
                          </span>
                        </li>
                      </li>
                    </ul>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
