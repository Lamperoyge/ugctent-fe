import { useEffect, useState } from 'react';
import { useJobApplications } from 'hooks';
import { classNames } from 'utils/helpers';
import InfiniteScroll from 'components/InfiniteScroll';

import {
  CheckCircleIcon,
  ChevronRightIcon,
  MailIcon,
  StarIcon,
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
import { UserCircleIcon } from '@heroicons/react/outline';
import StatusChip from 'components/StatusChip';

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
        <div className='bg-white sm:rounded-md'>
          {jobApplications?.getJobApplications?.length ? (
            <ul
              role='list'
              className='grid grid-cols-1 gap-6 sm:grid-cols-2'
            >
              <InfiniteScroll onLoadMore={handleFetchMore} hasMore={hasMore}>
                {jobApplications?.getJobApplications.map((application) => (
                  <li
                    key={application?._id}
                    className='col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200 max-w-md'
                  >
                    <Link
                      href={`/projects/${jobId}/applications/${application._id}`}
                    >
                      <div className='flex flex-col gap-4 items-start p-4'>
                        <div className='flex justify-between items-start w-full'>
                          <div className="flex gap-4">
                          <ProfilePicture
                            size='h-10 w-10'
                            src={application?.creator?.profilePicture}
                          />
                          <div className='flex flex-col gap-2'>
                            <span className='text-sm font-bold text-gray-500'>
                              {application?.creator?.firstName}{' '}
                              {application?.creator?.lastName}
                            </span>
                            
                            <div className='flex gap-2'>
                              <StarIcon className='text-orange-300 h-4 w-4' />
                              <span className='text-xs text-gray-400'>{application?.creatorRating ? application?.creatorRating :  "No reviews yet"}</span>
                            </div>
                          </div>

                          </div>
                  <StatusChip status={application.status}/>
                        </div>
                        <span className="text-sm text-gray-500">Applied {sinceDate(parseInt(application.createdAt, 10))}</span>
                        <div className="flex gap-2 flex-col">
                          <span className='text-sm text-gray-400 font-bold'>
                            Offer
                            </span>
                            <span className="text-sm text-gray-500">
                              {(application?.price / 100).toFixed(2)} RON
                            </span>
                        </div>
                         <div className="flex flex-col gap-1">
                          <span className="text-sm text-gray-400 font-bold">Message</span>
                         <span className='text-sm text-gray-800 line-clamp-3 w-full h-full break-all'>
                  {application?.message}
                            </span>
                         </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </InfiniteScroll>
            </ul>
          ) : (
            <div className='flex justify-center items-center text-gray-400 gap-4 flex-col'>
              <UserCircleIcon className='h-8 w-8' />
              No applications yet. Make sure to check back later.
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default ApplicationsList;
