import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_JOBS } from 'graphql/queries';
import { useAuth } from 'hooks';
import { LIMIT } from 'utils/constants';
import ProjectsList from 'components/Projects/List';
import EmptyStateAction from 'components/EmptyState';
import InfiniteScroll from 'components/InfiniteScroll'

const ExplorePageComponent = () => {
  const { user } = useAuth();
  const [hasMore, setHasMore] = useState(false);
  const { data, loading, error, previousData, fetchMore, variables } = useQuery(
    GET_JOBS,
    {
      variables: {
        input: {
          limit: LIMIT,
          offset: 0,
          // skillIds: user?.userInfo?.skillIds,
          // categoryIds: user?.userInfo?.interestIds
        },
      },
      skip: !user?._id,
      onCompleted: ({ getJobs }) => {
        if (!previousData && getJobs?.length === LIMIT) setHasMore(true);
      },
    }
  );

  const fetchNextJobs = () => {
    fetchMore({
      variables: {
        input: {
          ...variables?.input,
          offset: data?.getJobs?.length,
        },
      },
    }).then(({data}) => {
      setHasMore(data?.getJobs?.length >= LIMIT)
    });
  };

  const jobs = data?.getJobs || [];
  return (
    <div className='h-full w-full'>
      <h1 className='text-2xl font-semibold text-gray-900 py-5'>Explore Projects</h1>
      {loading && !data?.getJobs?.length && null}
      <div className='h-full w-full flex justify-center items-center'>
    <InfiniteScroll onLoadMore={fetchNextJobs} hasMore={hasMore}>
    <ProjectsList data={jobs} />

    </InfiniteScroll>
        {!jobs.length && !loading && (
          <EmptyStateAction
            title='No projects in here'
            subtitle='Try updating your filters'
          />
        )}
      </div>
    </div>
  );
};

export default ExplorePageComponent;
