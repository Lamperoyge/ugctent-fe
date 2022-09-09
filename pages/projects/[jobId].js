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
import {Attachments} from 'components/CreateProject/helpers'
import ViewAttachments from 'components/ViewAttachments';
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

export default function ProjectPage({}) {
  const router = useRouter();
  const { user } = useAuth();
  const { data, error, loading } = useQuery(GET_JOB_BY_ID, {
    variables: {
      id: router.query.jobId,
    },
    skip: !router?.query?.jobId,
  });

  console.log(data);
  if (!data?.getJobById) return null;

  const job = data?.getJobById;

  return (
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
                      <button
                        type='button'
                        className='inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900'
                      >
                        <BellIcon
                          className='-ml-1 mr-2 h-5 w-5 text-gray-400'
                          aria-hidden='true'
                        />
                        <span>Apply</span>
                      </button>
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
                              parseInt(job.createdAt)
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
                        <ul role='list' className='mt-3 space-y-3'>
                          <li className='flex justify-start'>
                            <a href='#' className='flex items-center space-x-3'>
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
                <section
                  aria-labelledby='activity-title'
                  className='mt-8 xl:mt-10'
                >
                  <div>
                    <div className='divide-y divide-gray-200'>
                      <div className='pb-4'>
                        <h2
                          id='activity-title'
                          className='text-lg font-medium text-gray-900'
                        >
                          Applications
                        </h2>
                      </div>
                      <div className='pt-6'>
                        {/* Activity feed*/}
                        <div className='flow-root'>
                          <ul role='list' className='-mb-8'>
                            {activity.map((item, itemIdx) => (
                              <li key={item.id}>
                                <div className='relative pb-8'>
                                  {itemIdx !== activity.length - 1 ? (
                                    <span
                                      className='absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200'
                                      aria-hidden='true'
                                    />
                                  ) : null}
                                  <div className='relative flex items-start space-x-3'>
                                    {item.type === 'comment' ? (
                                      <>
                                        <div className='relative'>
                                          <img
                                            className='h-10 w-10 rounded-full bg-gray-400 flex items-center justify-center ring-8 ring-white'
                                            src={item.imageUrl}
                                            alt=''
                                          />

                                          <span className='absolute -bottom-0.5 -right-1 bg-white rounded-tl px-0.5 py-px'>
                                            <ChatAltIcon
                                              className='h-5 w-5 text-gray-400'
                                              aria-hidden='true'
                                            />
                                          </span>
                                        </div>
                                        <div className='min-w-0 flex-1'>
                                          <div>
                                            <div className='text-sm'>
                                              <a
                                                href={item.person.href}
                                                className='font-medium text-gray-900'
                                              >
                                                {item.person.name}
                                              </a>
                                            </div>
                                            <p className='mt-0.5 text-sm text-gray-500'>
                                              Commented {item.date}
                                            </p>
                                          </div>
                                          <div className='mt-2 text-sm text-gray-700'>
                                            <p>{item.comment}</p>
                                          </div>
                                        </div>
                                      </>
                                    ) : item.type === 'assignment' ? (
                                      <>
                                        <div>
                                          <div className='relative px-1'>
                                            <div className='h-8 w-8 bg-gray-100 rounded-full ring-8 ring-white flex items-center justify-center'>
                                              <UserCircleIconSolid
                                                className='h-5 w-5 text-gray-500'
                                                aria-hidden='true'
                                              />
                                            </div>
                                          </div>
                                        </div>
                                        <div className='min-w-0 flex-1 py-1.5'>
                                          <div className='text-sm text-gray-500'>
                                            <a
                                              href={item.person.href}
                                              className='font-medium text-gray-900'
                                            >
                                              {item.person.name}
                                            </a>{' '}
                                            assigned{' '}
                                            <a
                                              href={item.assigned.href}
                                              className='font-medium text-gray-900'
                                            >
                                              {item.assigned.name}
                                            </a>{' '}
                                            <span className='whitespace-nowrap'>
                                              {item.date}
                                            </span>
                                          </div>
                                        </div>
                                      </>
                                    ) : (
                                      <>
                                        <div>
                                          <div className='relative px-1'>
                                            <div className='h-8 w-8 bg-gray-100 rounded-full ring-8 ring-white flex items-center justify-center'>
                                              <TagIcon
                                                className='h-5 w-5 text-gray-500'
                                                aria-hidden='true'
                                              />
                                            </div>
                                          </div>
                                        </div>
                                        <div className='min-w-0 flex-1 py-0'>
                                          <div className='text-sm leading-8 text-gray-500'>
                                            <span className='mr-0.5'>
                                              <a
                                                href={item.person.href}
                                                className='font-medium text-gray-900'
                                              >
                                                {item.person.name}
                                              </a>{' '}
                                              added tags
                                            </span>{' '}
                                            <span className='mr-0.5'>
                                              {item.tags.map((tag) => (
                                                <Fragment key={tag.name}>
                                                  <a
                                                    href={tag.href}
                                                    className='relative inline-flex items-center rounded-full border border-gray-300 px-3 py-0.5 text-sm'
                                                  >
                                                    <span className='absolute flex-shrink-0 flex items-center justify-center'>
                                                      <span
                                                        className={classNames(
                                                          tag.color,
                                                          'h-1.5 w-1.5 rounded-full'
                                                        )}
                                                        aria-hidden='true'
                                                      />
                                                    </span>
                                                    <span className='ml-3.5 font-medium text-gray-900'>
                                                      {tag.name}
                                                    </span>
                                                  </a>{' '}
                                                </Fragment>
                                              ))}
                                            </span>
                                            <span className='whitespace-nowrap'>
                                              {item.date}
                                            </span>
                                          </div>
                                        </div>
                                      </>
                                    )}
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className='mt-6'>
                          <div className='flex space-x-3'>
                            <div className='flex-shrink-0'>
                              <div className='relative'>
                                <img
                                  className='h-10 w-10 rounded-full bg-gray-400 flex items-center justify-center ring-8 ring-white'
                                  src='https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80'
                                  alt=''
                                />

                                <span className='absolute -bottom-0.5 -right-1 bg-white rounded-tl px-0.5 py-px'>
                                  <ChatAltIcon
                                    className='h-5 w-5 text-gray-400'
                                    aria-hidden='true'
                                  />
                                </span>
                              </div>
                            </div>
                            <div className='min-w-0 flex-1'>
                              <form action='#'>
                                <div>
                                  <label htmlFor='comment' className='sr-only'>
                                    Comment
                                  </label>
                                  <textarea
                                    id='comment'
                                    name='comment'
                                    rows={3}
                                    className='shadow-sm block w-full focus:ring-gray-900 focus:border-gray-900 sm:text-sm border border-gray-300 rounded-md'
                                    placeholder='Leave a comment'
                                    defaultValue={''}
                                  />
                                </div>
                                <div className='mt-6 flex items-center justify-end space-x-4'>
                                  <button
                                    type='button'
                                    className='inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900'
                                  >
                                    <CheckCircleIcon
                                      className='-ml-1 mr-2 h-5 w-5 text-green-500'
                                      aria-hidden='true'
                                    />
                                    <span>Close issue</span>
                                  </button>
                                  <button
                                    type='submit'
                                    className='inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gray-900 hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900'
                                  >
                                    Comment
                                  </button>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
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
                        {new Date(parseInt(job.updatedAt)).toLocaleDateString()}
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
                  <ul role='list' className='mt-3 space-y-3'>
                    <li className='flex justify-start'>
                      <a href='#' className='flex items-center space-x-3'>
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
                  <h2 className='text-sm font-medium text-gray-500'>Skills</h2>
                  <ul
                    role='list'
                    className='flex mt-2 leading-8 flex-wrap gap-2'
                  >
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
                  <ul
                    role='list'
                    className='flex mt-2 leading-8 flex-wrap gap-2'
                  >
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
  );
}
