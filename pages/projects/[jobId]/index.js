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
  CheckCircleIcon,
  PencilIcon,
  TagIcon,
  UserCircleIcon as UserCircleIconSolid,
} from '@heroicons/react/solid';
import { classNames } from 'utils/helpers';
import { useAuth } from 'hooks';
import Link from 'next/link';
import StatusChip from 'components/StatusChip';
import ViewAttachments from 'components/ViewAttachments';
import CreateJobApplication from 'components/CreateJobApplication';
import ApplicationsList from 'components/ApplicationsList';
const activity = [
  {
    id: 1,
    type: 'comment',
    person: { name: 'Eduardo Benz', href: '#' },
    imageUrl:
      'https://images.unsplash.com/photo-1520785643438-5bf77931f493?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80',
    comment:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt nunc ipsum tempor purus vitae id. Morbi in vestibulum nec varius. Et diam cursus quis sed purus nam. ',
    date: '6d ago',
  },
  {
    id: 2,
    type: 'assignment',
    person: { name: 'Hilary Mahy', href: '#' },
    assigned: { name: 'Kristin Watson', href: '#' },
    date: '2d ago',
  },
  {
    id: 3,
    type: 'tags',
    person: { name: 'Hilary Mahy', href: '#' },
    tags: [
      { name: 'Bug', href: '#', color: 'bg-rose-500' },
      { name: 'Accessibility', href: '#', color: 'bg-indigo-500' },
    ],
    date: '6h ago',
  },
  {
    id: 4,
    type: 'comment',
    person: { name: 'Jason Meyers', href: '#' },
    imageUrl:
      'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80',
    comment:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt nunc ipsum tempor purus vitae id. Morbi in vestibulum nec varius. Et diam cursus quis sed purus nam. Scelerisque amet elit non sit ut tincidunt condimentum. Nisl ultrices eu venenatis diam.',
    date: '2h ago',
  },
];

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

  const canEdit = job?.creator?._id === user?._id;

  const canApply = job?.creator?._id !== user?._id && isStripeVerified;

  const toggleCreateApplicationModal = () => {
    if (job.userApplication.hasUserApplied) {
      return router.push(
        `/projects/${job._id}/applications/${job?.userApplication?._id}`,
        undefined,
        { shallow: true }
      );
    } else {
      setIsCreateApplicationModalOpen((prevState) => !prevState);
    }
  };

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
                          <Link href={`/profile/${job.creator?._id}`}>
                            <a className='font-medium text-gray-900'>
                              {job.creator?.firstName} {job.creator?.lastName}
                            </a>
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
                        {!canApply && (
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
                            4 comments
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
                            Assignees
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
                                  Eduardo Benz
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
                {user?._id === job.creator?.userId && (
                  <ApplicationsList jobId={job._id} />
                )}
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
                      4 comments
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
                        Updated on{' '}
                        <time dateTime='2020-12-02'>
                          {new Date(
                            parseInt(job.updatedAt)
                          ).toLocaleDateString()}
                        </time>
                      </span>
                    </div>
                  )}
                </div>
                <div className='mt-6 border-t border-gray-200 py-6 space-y-8'>
                  <div>
                    <h2 className='text-sm font-medium text-gray-500'>
                      Assignees
                    </h2>
                    <ul className='mt-3 space-y-3'>
                      <li className='flex justify-start'>
                        <a className='flex items-center space-x-3'>
                          <div className='flex-shrink-0'>
                            <img
                              className='h-5 w-5 rounded-full'
                              src='https://images.unsplash.com/photo-1520785643438-5bf77931f493?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80'
                              alt=''
                            />
                          </div>
                          <div className='text-sm font-medium text-gray-900'>
                            Eduardo Benz
                          </div>
                        </a>
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
                      {/* {job?.map((skill) => (
                      <li
                        className='border rounded-full py-1 px-3 text-xs mr-2 font-semibold text-white bg-primaryOrange items-center'
                        key={skill._id}
                      >
                        <span className='block truncate'>{skill.label}</span>
                      </li>
                    ))} */}
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
