import { useLazyQuery, useQuery } from '@apollo/client';
import { GET_SUBMISSIONS_FOR_JOB } from 'graphql/queries';
import {
  LIMIT,
  SUBMISSION_STATUS_COLORS,
  SUBMISSION_STATUS_LABELS,
} from 'utils/constants';
import Tabs from 'components/Tabs';
import { LightSpinner } from 'components/Shared/Spinner';
import { PuzzleIcon } from '@heroicons/react/outline';
import {
  CheckCircleIcon,
  ChevronRightIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/solid';
import Link from 'next/link';
import InfiniteScroll from 'components/InfiniteScroll';
import { useEffect, useState } from 'react';
import SubmissionView from 'components/SubmissionView';
import { useAuth } from 'hooks';

const SubmissionsList = ({ jobId, assignee }) => {
  const [activeSubmissionId, setActiveSubmissionId] = useState(null);
  const [hasMore, setHasMore] = useState(false);
  const user = useAuth();

  
  const [getSubmissions, { data, fetchMore, loading }] = useLazyQuery(
    GET_SUBMISSIONS_FOR_JOB,

    {
      notifyOnNetworkStatusChange: true,
      fetchPolicy: 'cache-and-network',
      nextFetchPolicy: 'cache-and-network',
    }
  );


  console.log(data?.getSubmissionsForJob, 'data?.getSubmissionsForJob')

  useEffect(() => {
    if(jobId) {
      getSubmissions({
        variables: {
          jobId,
          limit: LIMIT,
          offset: 0,
        }
      }).then(({data}) => setHasMore(data?.getSubmissionsForJob?.length >= LIMIT));  
    }
  }, [jobId])

  const handleFetchMore = () =>
    fetchMore({
      variables: {
          offset: data?.getSubmissionsForJob?.length,
      },
    }).then(({ data }) => {
      setHasMore(data?.getSubmissionsForJob?.length >= LIMIT);
    });

  const handleClose = () => setActiveSubmissionId(null);

  return (
    <>
      <SubmissionView
        submissionId={activeSubmissionId}
        onClose={handleClose}
        isOpen={!!activeSubmissionId}
      />
      <main className='pt-8 pb-16'>
        <div className='w-full mx-auto'>
          <div className=''>
            <h2 className='text-lg font-medium text-gray-900'>Submissions</h2>
          </div>
          <ul
            role='list'
            className='mt-5 border-t border-gray-200 divide-y divide-gray-200 sm:mt-0 sm:border-t-0'
          >
            {!loading && data?.getSubmissionsForJob?.length === 0 ? (
              <div className='w-full h-full flex justify-center items-center flex-col gap-4'>
                <span className='font-medium text-gray-400'>
                  No submissions yet.
                </span>
                <PuzzleIcon className='text-gray-300 w-12 h-12 font-medium' />
                {user?._id === assignee ? (
                  <button className='font-bold inline-flex items-center px-4 py-2 my-4 border border-transparent shadow-sm text-sm rounded-md text-white bg-secondary hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary'>
                    Create submission
                  </button>
                ) : null}
              </div>
            ) : null}
            {loading && !data?.getSubmissionsForJob?.length ? (
              <LightSpinner />
            ) : (
              <InfiniteScroll onLoadMore={handleFetchMore} hasMore={hasMore}>
                {data?.getSubmissionsForJob?.map((submission) => {
                  const statusColor =
                    SUBMISSION_STATUS_COLORS[submission?.status];
                  return (
                    <li
                      key={submission._id}
                      onClick={() => setActiveSubmissionId(submission._id)}
                    >
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
                              <span
                                className={`inline-flex border border-${statusColor}-400 my-2 items-center px-2 py-0 rounded-full text-xs font-bold bg-${statusColor}-100 text-${statusColor}-800`}
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

                              <p className='text-sm font-medium text-secondary truncate'>
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
                  );
                })}
              </InfiniteScroll>
            )}
          </ul>
        </div>
      </main>
    </>
  );
};

export default SubmissionsList;
