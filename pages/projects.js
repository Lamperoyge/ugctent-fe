import Head from 'next/head';
import { useAuth } from 'hooks';
import EmptyStateAction from 'components/EmptyState';
import { useState, useEffect } from 'react';
import CreateProjectModal from 'components/CreateProject';
import { CREATE_JOB } from 'graphql/mutations';
import { GET_ASSIGNED_JOBS, GET_CREATED_JOBS } from 'graphql/queries';
import { useLazyQuery } from '@apollo/client';
import { USER_TYPES } from 'utils/constants';

export default function Projects() {
  const [open, setIsOpen] = useState(false);
  const { user } = useAuth();

  const [
    getJobsForCreator,
    { data: creatorJobs, error: creatorJobsError, loading: creatorJobsLoading },
  ] = useLazyQuery(GET_CREATED_JOBS);

  const [
    getJobsForBusinessUser,
    {
      data: businessJobs,
      error: businessJobsError,
      loading: businessLoading,
      fetchMore,
      refetch,
    },
  ] = useLazyQuery(GET_ASSIGNED_JOBS);
  useEffect(() => {
    if (user?.userType === USER_TYPES.CREATOR) {
      getJobsForCreator({
        variables: {
          input: {
            userId: user?._id,
            limit: 10,
            offset: 0,
          },
        },
      });
    }
    if (user?.userType === USER_TYPES.ORG) {
      getJobsForBusinessUser({
        variables: {
          input: {
            userId: user?._id,
            limit: 10,
            offset: 0,
          },
        },
      });
    }
  }, [user]);

  return (
    <div className='h-full w-full'>
      <div className='h-full w-full flex justify-center items-center'>
        <CreateProjectModal open={open} onClose={() => setIsOpen(false)} />
        <EmptyStateAction
          title='Your projects'
          subtitle='Add a new project'
          btnTitle='New project'
          action={() => setIsOpen(true)}
        />
      </div>
    </div>
  );
}
