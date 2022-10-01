import { CheckIcon, ThumbUpIcon, UserIcon } from '@heroicons/react/solid';
import { classNames } from 'utils/helpers';
import { useQuery } from '@apollo/client';
import { GET_JOB_APPLICATION_BY_ID } from 'graphql/queries';
import { useRouter } from 'next/router';
import {
  InvalidApplication,
  LoadingState,
} from 'components/ApplicationView/Helpers';
import Link from 'next/link';
import ProfilePicture from 'components/ProfilePicture';
import ApplicationDataViewPanel from 'components/ApplicationDataViewPanel';
import Comments from 'components/Comments';
import { COMMENT_ENTITY_TYPES } from 'utils/constants';

const user = {
  name: 'Whitney Francis',
  email: 'whitney@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80',
};
const eventTypes = {
  applied: { icon: UserIcon, bgColorClass: 'bg-gray-400' },
  advanced: { icon: ThumbUpIcon, bgColorClass: 'bg-blue-500' },
  completed: { icon: CheckIcon, bgColorClass: 'bg-green-500' },
};
const timeline = [
  {
    id: 1,
    type: eventTypes.applied,
    content: 'Applied to',
    target: 'Front End Developer',
    date: 'Sep 20',
    datetime: '2020-09-20',
  },
  {
    id: 2,
    type: eventTypes.advanced,
    content: 'Advanced to phone screening by',
    target: 'Bethany Blake',
    date: 'Sep 22',
    datetime: '2020-09-22',
  },
  {
    id: 3,
    type: eventTypes.completed,
    content: 'Completed phone screening with',
    target: 'Martha Gardner',
    date: 'Sep 28',
    datetime: '2020-09-28',
  },
  {
    id: 4,
    type: eventTypes.advanced,
    content: 'Advanced to interview by',
    target: 'Bethany Blake',
    date: 'Sep 30',
    datetime: '2020-09-30',
  },
  {
    id: 5,
    type: eventTypes.completed,
    content: 'Completed interview with',
    target: 'Katherine Snyder',
    date: 'Oct 4',
    datetime: '2020-10-04',
  },
];
const comments = [
  {
    id: 1,
    name: 'Leslie Alexander',
    date: '4d ago',
    imageId: '1494790108377-be9c29b29330',
    body: 'Ducimus quas delectus ad maxime totam doloribus reiciendis ex. Tempore dolorem maiores. Similique voluptatibus tempore non ut.',
  },
  {
    id: 2,
    name: 'Michael Foster',
    date: '4d ago',
    imageId: '1519244703995-f4e0f30006d5',
    body: 'Et ut autem. Voluptatem eum dolores sint necessitatibus quos. Quis eum qui dolorem accusantium voluptas voluptatem ipsum. Quo facere iusto quia accusamus veniam id explicabo et aut.',
  },
  {
    id: 3,
    name: 'Dries Vincent',
    date: '4d ago',
    imageId: '1506794778202-cad84cf45f1d',
    body: 'Expedita consequatur sit ea voluptas quo ipsam recusandae. Ab sint et voluptatem repudiandae voluptatem et eveniet. Nihil quas consequatur autem. Perferendis rerum et.',
  },
];

export default function ApplicationView({ applicationData }) {
  const router = useRouter();

  const { data, loading, error } = useQuery(GET_JOB_APPLICATION_BY_ID, {
    variables: {
      id: router.query.applicationId,
    },
    skip: !router.query.applicationId,
  });

  if (error) {
    return <InvalidApplication jobId={router.query.jobId} />;
  }

  if (loading) return <LoadingState />;
  if (!data) return null;

  const application = data.getJobApplicationById;

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

  return (
    <>
      <div className='min-h-full'>
        <main className='py-10'>
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
                    {application.creator.firstName}{' '}
                    {application.creator.lastName}
                  </h1>
                  <Link href={`/users/${application.creator._id}`}>
                    <a className='text-sm font-medium text-secondary hover:text-primary'>
                      View profile
                    </a>
                  </Link>
                </span>
                <p className='text-sm font-medium text-gray-500'>
                  Applied for{' '}
                  <Link href={`/projects/${application.job._id}`} passHref>
                    <a className='text-gray-900'>{application.job.title}</a>
                  </Link>{' '}
                  on{' '}
                  <time dateTime='2020-08-25'>
                    {new Date(
                      new Date(parseInt(application.createdAt, 10))
                    ).toLocaleDateString()}
                  </time>
                </p>
              </div>
            </div>
            <div className='mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3'>
              <button
                type='button'
                className='inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500'
              >
                Decline
              </button>
              <button
                type='button'
                className='inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500'
              >
                Accept
              </button>
            </div>
          </div>

          <div className='mt-8 mx-auto grid grid-cols-1 gap-6 sm:px-6 lg:grid-flow-col-dense lg:grid-cols-3'>
            <div className='space-y-6 lg:col-start-1 lg:col-span-2'>
              {/* Description list*/}
              <ApplicationDataViewPanel
                application={application}
                header={'Application'}
                subHeader={'Message, offer'}
                fields={applicationPanelData}
              />
              {/* Comments*/}
              <Comments
                entityId={router.query.applicationId}
                entityType={COMMENT_ENTITY_TYPES.JOB_APPLICATION}
              />
            </div>

            <section
              aria-labelledby='timeline-title'
              className='lg:col-start-3 lg:col-span-1'
            >
              <div className='bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6'>
                <h2
                  id='timeline-title'
                  className='text-lg font-medium text-gray-900'
                >
                  Timeline
                </h2>

                {/* Activity Feed */}
                <div className='mt-6 flow-root'>
                  <ul role='list' className='-mb-8'>
                    {timeline.map((item, itemIdx) => (
                      <li key={item.id}>
                        <div className='relative pb-8'>
                          {itemIdx !== timeline.length - 1 ? (
                            <span
                              className='absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200'
                              aria-hidden='true'
                            />
                          ) : null}
                          <div className='relative flex space-x-3'>
                            <div>
                              <span
                                className={classNames(
                                  item.type.bgColorClass,
                                  'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white'
                                )}
                              >
                                <item.type.icon
                                  className='w-5 h-5 text-white'
                                  aria-hidden='true'
                                />
                              </span>
                            </div>
                            <div className='min-w-0 flex-1 pt-1.5 flex justify-between space-x-4'>
                              <div>
                                <p className='text-sm text-gray-500'>
                                  {item.content}{' '}
                                  <a
                                    href='#'
                                    className='font-medium text-gray-900'
                                  >
                                    {item.target}
                                  </a>
                                </p>
                              </div>
                              <div className='text-right text-sm whitespace-nowrap text-gray-500'>
                                <time dateTime={item.datetime}>
                                  {item.date}
                                </time>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className='mt-6 flex flex-col justify-stretch'>
                  <button
                    type='button'
                    className='inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                  >
                    Advance to offer
                  </button>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </>
  );
}
