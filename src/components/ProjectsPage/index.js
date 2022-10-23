import { useAuth } from 'hooks';
import EmptyStateAction from 'components/EmptyState';
import { useState, useEffect } from 'react';
import CreateProjectModal from 'components/CreateProject';
import { GET_ASSIGNED_JOBS, GET_CREATED_JOBS } from 'graphql/queries';
import { useLazyQuery } from '@apollo/client';
import { USER_TYPES } from 'utils/constants';
import ProjectsList from 'components/Projects/List';

export default function Projects() {
  const [open, setIsOpen] = useState(false);
  const { user } = useAuth();

  const [
    getJobsForBusinessUser,
    { data: businessJobs, error: businessJobsError, loading: businessLoading },
  ] = useLazyQuery(GET_CREATED_JOBS);

  const [
    getJobsForCreator,
    {
      data: creatorJobs,
      error: creatorJobsError,
      loading: creatorJobsLoading,
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

  const displayEmptyState =
    user?.userType === USER_TYPES.CREATOR
      ? !creatorJobs?.getJobsForCreator?.length && !creatorJobsLoading
      : !businessJobs?.getJobsForBusinessUser?.length && !businessLoading;

  const data =
    creatorJobs?.getJobsForCreator || businessJobs?.getJobsForBusinessUser;

  return (
    <div className='h-full w-full'>
      <h1 className='text-2xl font-semibold text-gray-900 py-5'>Projects</h1>

      <div className='h-full w-full flex justify-center items-center'>
        {!displayEmptyState && <ProjectsList data={data} />}
        {open && (
          <CreateProjectModal open={open} onClose={() => setIsOpen(false)} />
        )}
        {displayEmptyState && (
          <EmptyStateAction
            title='No projects in here'
            subtitle='Add a new project'
            btnTitle='New project'
            action={() => setIsOpen(true)}
          />
        )}
      </div>
    </div>
  );
}
