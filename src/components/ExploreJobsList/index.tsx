import InfiniteScroll from 'components/InfiniteScroll';
import ProfilePicture from 'components/ProfilePicture';
import Link from 'next/link';
import { sinceDate } from 'utils/helpers/dateFormatter';
import { Badge } from '@mantine/core';

const ExploreJobsList = ({ jobs, fetchNextJobs, hasMore }) => {
  return (
    <ul
      role='list'
      className='grid grid-cols-1 gap-6 py-5 sm:grid-cols-2 lg:grid-cols-3'
    >
      <InfiniteScroll onLoadMore={fetchNextJobs} hasMore={hasMore}>
        {jobs?.map((job) => (
          <Link key={job?._id} href={`/projects/${job?._id}`} className="relative cursor-pointer col-span-1 flex flex-col p-4 text-center bg-white border border-gray-300 rounded-lg shadow hover:shadow-xl transition-shadow">
          {/* <li className='cursor-pointer col-span-1 flex flex-col p-4 text-center bg-white border border-gray-300 rounded-lg shadow'> */}
           <div className="absolute top-1 right-1">
           {job?.userApplication?.hasUserApplied ? <Badge size="sm" color="yellow">Applied</Badge> : null}
           </div>
            <div className='flex-1 flex justify-start items-center gap-2'>
              <ProfilePicture
                src={job?.creator?.profilePicture}
                size='h-10 w-10'
                className='object-cover rounded-full'
              />
              <div>
                <h3 className='text-gray-900 text-sm font-medium text-left'>
                  {job?.creator?.firstName} {job?.creator?.lastName}
                </h3>
                {job?.creator?.country ? (
                  <h4 className='text-gray-500 text-xs font-medium text-left'>
                    {job?.creator?.country} - {job?.creator?.city}
                  </h4>
                ) : null}
              </div>
            </div>
            <div className='flex-1 flex flex-col justify-start items-center gap-2'>
              <h4 className='text-gray-700 text-xs font-medium text-left w-full pt-4'>
                RON {job?.price ? (parseInt(job?.price, 10) / 100)?.toFixed(2) : 'Unset'}
              </h4>

              <h2 className='text-gray-900 text-md font-bold text-left w-full truncate'>
                {job?.title}
              </h2>
              <p className='text-gray-700 text-sm font-medium text-left w-full line-clamp-2 sm:line-clamp-3 md:line-clamp-4'>
                {job?.description}
              </p>
              <h5 className='text-xs text-gray-500 w-full text-left pt-4'>
                Posted {sinceDate(parseInt(job?.createdAt, 10))}
              </h5>
              <h5 className="text-xs text-gray-500 w-full text-left pt-4">
                  {job?.applicationsCount || 0} {job?.applicationsCount === 1 ? 'application' : 'applications'}
              </h5>
            </div>
          {/* </li> */}
          </Link>
        ))}
      </InfiniteScroll>
    </ul>
  );
};

export default ExploreJobsList;
