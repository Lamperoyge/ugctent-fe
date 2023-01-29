import { useEffect, useState } from 'react';
import { useJobApplications } from 'hooks';
import { classNames } from 'utils/helpers';
import InfiniteScroll from 'components/InfiniteScroll';

import {
  CheckCircleIcon,
  ChevronRightIcon,
  MailIcon,
} from '@heroicons/react/solid';
import {
  JOB_APPLICATION_STATUS,
  LIMIT,
  JOB_APPLICATION_STATUS_LABELS,
} from 'utils/constants';
import { LightSpinner } from 'components/Shared/Spinner';
import Link from 'next/link';
import ProfilePicture from 'components/ProfilePicture';
import { sinceDate } from 'utils/helpers/dateFormatter';

const ApplicationsList = ({ jobId }) => {
  const { getJobApplications, jobApplications, fetchMoreJobApplications } =
    useJobApplications();

  const [hasMore, setHasMore] = useState(true);
  useEffect(() => {
    getJobApplications({
      variables: {
        limit: LIMIT,
        offset: 0,
        jobId,
      },
    }).then(({ data }) => setHasMore(data.getJobApplications.length >= LIMIT));
  }, []);

  const handleFetchMore = () =>
    fetchMoreJobApplications({
      variables: {
        offset: jobApplications?.getJobApplications?.length,
      },
    }).then(({ data }) => setHasMore(data.getJobApplications.length >= LIMIT));
  // const textColor = `text-${statusColor}-400`;

  const JOB_APPLICATION_COLORS = {
    [JOB_APPLICATION_STATUS.IN_REVIEW]: 'text-yellow-400',
    [JOB_APPLICATION_STATUS.ACCEPTED]: ' text-green-400',
    [JOB_APPLICATION_STATUS.REJECTED]: ' text-red-400',
  };
  return (
    <main className='pt-8 pb-16'>
      <div className='w-full mx-auto'>
        <div className='pb-4'>
          <h2 className='text-lg font-medium text-gray-900'>Applications</h2>
        </div>
        <div className='bg-white shadow overflow-hidden sm:rounded-md'>
          <ul role='list' className='divide-y divide-gray-200'>
            <InfiniteScroll onLoadMore={handleFetchMore} hasMore={hasMore}>
              {jobApplications?.getJobApplications.map((application) => (
                <li key={application?._id}>
                  <Link
                    href={`/projects/${jobId}/applications/${application._id}`}
                    className='block hover:bg-gray-50'
                  >
                    <div className='flex items-center px-4 py-4 sm:px-6'>
                      <div className='min-w-0 flex-1 flex items-center'>
                        <div className='flex-shrink-0'>
                          <ProfilePicture
                            size='h-12 w-12'
                            src={application?.creator?.profilePicture}
                          />
                        </div>
                        <div className='min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4'>
                          <div>
                            <p className='text-sm font-medium text-indigo-600 truncate'>
                              {application.creator?.firstName}{' '}
                              {application?.creator?.lastName}
                            </p>
                            <p className='mt-2 flex items-center text-sm text-gray-500'>
                              <span className='truncate'>
                                {application.message}
                              </span>
                            </p>
                          </div>
                          <div className='hidden md:block'>
                            <div>
                              <p className='text-sm text-gray-900'>
                                Applied{' '}
                                {sinceDate(parseInt(application.createdAt, 10))}
                              </p>
                              <p
                                className={`mt-2 flex items-center text-sm ${
                                  JOB_APPLICATION_COLORS[application.status]
                                }`}
                              >
                                <CheckCircleIcon
                                  className={`flex-shrink-0 mr-1.5 h-5 w-5 ${
                                    JOB_APPLICATION_COLORS[application.status]
                                  }`}
                                  aria-hidden='true'
                                />
                                {/* {application.stage} */}
                                {
                                  JOB_APPLICATION_STATUS_LABELS[
                                    application.status
                                  ]
                                }
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <ChevronRightIcon
                          className='h-5 w-5 text-gray-400'
                          aria-hidden='true'
                        />
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </InfiniteScroll>
          </ul>
        </div>
      </div>
    </main>
  );
};

export default ApplicationsList;
