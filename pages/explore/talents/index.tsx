import { useState } from 'react';
import { GET_EXPLORE_CREATORS } from 'graphql/queries';
import { LIMIT } from 'utils/constants';
import { useQuery } from '@apollo/client';
import ProfilePicture from 'components/ProfilePicture';
import InfiniteScroll from 'components/InfiniteScroll';
import ExploreFilters from 'components/ExploreFilters';
import Skills from 'components/JobsPageComponents/skills';

import Link from 'next/link';

export default function TalentsPage() {
  const [hasMore, setHasMore] = useState(true);
  const { data, loading, error, refetch, fetchMore } = useQuery(
    GET_EXPLORE_CREATORS,
    {
      fetchPolicy: 'cache-and-network',
      nextFetchPolicy: 'cache-first',
      notifyOnNetworkStatusChange: true,
      variables: {
        limit: LIMIT,
        offset: 0,
      },
    }
  );

  const handleFetchMore = () =>
    fetchMore({
      variables: {
        offset: data?.getCreators?.length,
      },
    }).then(({ data }) => {
      setHasMore(data?.getCreators?.length >= LIMIT);
    });

  return (
    <div className='flex flex-col gap-8'>
      <ExploreFilters refetch={refetch} />
      <ul
        role='list'
        className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
      >
        <InfiniteScroll onLoadMore={handleFetchMore} hasMore={hasMore}>
          {data?.getCreators?.map((creator) => (
            <li
              key={creator._id}
              className='col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200'
            >
              <div className='flex-1 flex flex-col p-8 gap-4'>
                <ProfilePicture
                  src={creator?.profilePicture}
                  size='h-32 w-32'
                  className='object-cover mx-auto rounded-full'
                />
                <h3 className='text-gray-900 text-sm font-medium'>
                  {creator.firstName} {creator.lastName}
                </h3>
                <dl className='flex-grow flex flex-col justify-between gap-4'>
                  <dt className='sr-only'>Title</dt>
                  <p className='text-gray-500 text-sm truncate'>
                    {creator?.bio}
                  </p>
                  <dt className='sr-only'>Role</dt>
                  <div className='flex flex-wrap gap-2 items-baseline my-2 justify-center items-center'>
                    {creator?.skills?.slice(0, 1).map((skill) => (
                      <li
                        className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-200 text-blue-800'
                        key={skill._id}
                      >
                        <span className='block truncate'>{skill.label}</span>
                      </li>
                    ))}
                    {creator?.skills?.length > 1 ? (
                      <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-200 text-blue-800'>
                        <span className='block truncate'>
                          + {creator?.skills.length - 2}
                        </span>
                      </span>
                    ) : null}
                  </div>
                  <div>
                    <dt className='sr-only'>Location</dt>
                    <span className='text-gray-500 text-sm'>
                      {creator?.city ? `${creator.city}, ` : null}
                      {creator?.country}
                    </span>
                  </div>
                  <div className='py-4'>
                    <Link
                      href={`/profile/${creator.userId}`}
                      className='flex justify-center font-bold items-center px-4 py-1 w-full border border-transparent shadow-sm text-sm rounded-xl text-white bg-primaryOrange hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary'
                    >
                      Visit profile
                    </Link>
                  </div>
                </dl>
              </div>
              <div>
                <div className=' flex divide-x divide-gray-200'>
                  {/* <div className='w-0 flex-1 flex'>
                    <Link
                      href={`/profile/${creator.userId}`}
                      className='flex justify-center font-bold items-center px-4 py-1 w-full border border-transparent shadow-sm text-sm rounded-bl-lg rounded-br-lg text-white bg-secondary hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary'
                    >
                      Visit profile
                    </Link>
                  </div> */}
                </div>
              </div>
            </li>
          ))}
        </InfiniteScroll>
      </ul>
    </div>
  );
}
