import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_EXPLORE_JOBS } from 'graphql/queries';
import { useAuth } from 'hooks';
import { LIMIT } from 'utils/constants';
import EmptyStateAction from 'components/EmptyState';
import ExploreJobsList from 'components/ExploreJobsList';
import { ExploreJobsFilters } from 'components/ExploreFilters';

const ExplorePageComponent = () => {
  const { user }: any = useAuth();
  const [hasMore, setHasMore] = useState(true);
  const { data, loading, error, fetchMore, refetch } = useQuery(
    GET_EXPLORE_JOBS,
    {
      fetchPolicy: 'cache-and-network',
      nextFetchPolicy: 'network-only',
      notifyOnNetworkStatusChange: true,
      skip: !user?._id,
      variables: {
        limit: LIMIT,
        offset: 0,
      },
    }
  );

  const fetchNextJobs = () => {
    fetchMore({
      variables: {
        offset: data?.getExploreJobs?.length,
      },
    }).then(({ data }) => {
      setHasMore(data?.getExploreJobs?.length >= LIMIT);
    });
  };

  const jobs = data?.getExploreJobs || [];
  return (
    <div className='h-full w-full'>
      <h1 className='text-6xl font-bold text-gray-900 pt-5 text-center w-full'>
        Explore
      </h1>
      <p className='text-xl font-medium text-gray-900 pb-5 pt-2 text-center w-full'>
        Discover jobs that match your skills and interests
      </p>
      {loading && !data?.getExploreJobs?.length && null}

      <ExploreJobsFilters refetch={refetch} />
      <div className='h-full w-full flex justify-center items-center'>
        <ExploreJobsList
          jobs={jobs}
          fetchNextJobs={fetchNextJobs}
          hasMore={hasMore}
        />
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
