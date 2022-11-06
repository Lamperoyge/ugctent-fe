import { useQuery } from '@apollo/client';
import { GET_SUBMISSIONS_FOR_JOB } from 'graphql/queries';
import { LIMIT, JOB_SUBMISSION_STATUS } from 'utils/constants';
import Tabs from 'components/Tabs';
import { LightSpinner } from 'components/Shared/Spinner';
import {
  CheckCircleIcon,
  ChevronRightIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/solid';
import Link from 'next/link';
import InfiniteScroll from 'components/InfiniteScroll';
import { useState } from 'react';

const SubmissionsList = ({ jobId }) => {
  const [hasMore, setHasMore] = useState(false);
  const { data, previousData, fetchMore, loading, variables } = useQuery(
    GET_SUBMISSIONS_FOR_JOB,

    {
      notifyOnNetworkStatusChange: true,
      fetchPolicy: 'cache-and-network',
      nextFetchPolicy: 'cache-first',
      variables: {
        input: {
          jobId,
          limit: LIMIT,
          offset: 0,
        },
      },
      skip: !jobId,
      onCompleted: ({ getSubmissionsForJob }) => {
        if (!previousData && getSubmissionsForJob?.length === LIMIT)
          setHasMore(true);
      },
    }
  );

  const handleFetchMore = () =>
    fetchMore({
      variables: {
        input: {
          ...variables?.input,
          offset: data?.getSubmissionsForJob?.length,
        },
      },
    }).then(({ data }) => {
      setHasMore(data?.getSubmissionsForJob?.length >= LIMIT);
    });

  return (
    <main className='pt-8 pb-16'>
      <div className='w-full mx-auto'>
        <div className=''>
          <h2 className='text-lg font-medium text-gray-900'>Submissions</h2>
        </div>
        <ul
          role='list'
          className='mt-5 border-t border-gray-200 divide-y divide-gray-200 sm:mt-0 sm:border-t-0'
        >
          {loading && !data?.getSubmissionsForJob?.length ? (
            <LightSpinner />
          ) : (
            <InfiniteScroll onLoadMore={handleFetchMore} hasMore={hasMore}>
              {data?.getSubmissionsForJob?.map((submission) => (
                <Link href={`/projects/${jobId}/submissions/${submission._id}`}>
                  <li key={submission._id}>
                    <div className='flex items-center py-5 px-4 sm:py-6 sm:px-0 hover:bg-gray-100 cursor-pointer'>
                      <div className='min-w-0 flex-1 flex items-center'>
                        <div className='flex-shrink-0'>
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
                        </div>
                        <div className='min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4'>
                          <div>
                            <p className='text-sm font-medium text-purple-600 truncate'>
                              {submission.creator.firstName +
                                ' ' +
                                submission.creator.lastName}
                            </p>
                            <p className='mt-2 flex items-center text-sm text-gray-500'>
                              <span className='truncate'>
                                {submission.description.slice(0.3) + '...'}
                              </span>
                            </p>
                          </div>
                          <div className='hidden md:block'>
                            <div>
                              <p className='text-sm text-gray-900'>
                                Submitted on{' '}
                                <time
                                  dateTime={
                                    new Date(
                                      parseInt(submission?.createdAt, 10)
                                    )
                                  }
                                >
                                  {new Date(
                                    parseInt(submission?.createdAt, 10)
                                  ).toLocaleDateString()}
                                </time>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <ChevronRightIcon
                          className='h-5 w-5 text-gray-400 group-hover:text-gray-700'
                          aria-hidden='true'
                        />
                      </div>
                    </div>
                  </li>
                </Link>
              ))}
            </InfiniteScroll>
          )}
        </ul>
      </div>
    </main>
  );
};

export default SubmissionsList;
