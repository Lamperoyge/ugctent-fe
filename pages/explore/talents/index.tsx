import { useState } from 'react';
import { GET_EXPLORE_CREATORS } from 'graphql/queries';
import { LIMIT } from 'utils/constants';
import { useQuery } from '@apollo/client';
import ProfilePicture from 'components/ProfilePicture';
import InfiniteScroll from 'components/InfiniteScroll';
import ExploreFilters from 'components/ExploreFilters';

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
              <div className='flex-1 flex flex-col p-8'>
                <ProfilePicture
                  src={creator?.profilePicture}
                  size='h-32 w-32'
                  className='object-cover mx-auto rounded-full'
                />
                <h3 className='mt-6 text-gray-900 text-sm font-medium'>
                  {creator.firstName} {creator.lastName}
                </h3>
                <dl className='mt-1 flex-grow flex flex-col justify-between'>
                  <dt className='sr-only'>Title</dt>
                  <p className='text-gray-500 text-sm truncate'>
                    {creator?.bio}
                  </p>
                  <dt className='sr-only'>Role</dt>
                  <div className='flex flex-wrap gap-2 items-baseline my-2 justify-center items-center'>
                    {creator?.skills?.slice(0, 1).map((skill) => (
                      <span
                        className='border rounded-full py-1 px-3 text-xs mr-2 font-semibold text-white bg-primaryOrange items-center'
                        key={skill._id}
                      >
                        <span className='block truncate'>{skill?.label}</span>
                      </span>
                    ))}
                    {creator?.skills?.length > 1 ? (
                      <span className='border rounded-full py-1 px-3 text-xs mr-2 font-semibold text-slate-200 bg-slate-400 items-center'>
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
                </dl>
              </div>
              <div>
                <div className='-mt-px flex divide-x divide-gray-200'>
                  <div className='w-0 flex-1 flex'>
                    <button className='flex justify-center font-bold items-center px-4 py-1 w-full border border-transparent shadow-sm text-sm rounded-bl-lg rounded-br-lg text-white bg-secondary hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary'>
                      Visit profile
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </InfiniteScroll>
      </ul>
    </div>
  );
}
