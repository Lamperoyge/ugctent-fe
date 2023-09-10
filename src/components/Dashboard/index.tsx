import { ScaleIcon } from '@heroicons/react/outline';
import { CashIcon, ChevronRightIcon } from '@heroicons/react/solid';
import { classNames } from 'utils/helpers';
import { useAuth } from 'hooks';
import ProfilePicture from 'components/ProfilePicture';
import { useLazyQuery, useQuery } from '@apollo/client';
import {
  GET_ASSIGNED_JOBS,
  GET_CREATED_JOBS,
  GET_STRIPE_BALANCE,
  GET_TOTAL_COMPLETED_JOBS,
  GET_TOTAL_CREATED_JOBS,
  GET_TOTAL_ASSIGNED_JOBS,
} from 'graphql/queries';
import { LIMIT, USER_TYPES } from 'utils/constants';
import ProjectList from './ProjectsList';
import { useEffect } from 'react';

// const cards = [
//   { name: 'Total gained', href: '#', icon: ScaleIcon, amount: 'RON 30,659.45' },
//   // More items...
// ];

const CreatorCards = () => {
  const auth = useAuth();
  const [getStripeBalance, { data: stripeBalanceData }] =
    useLazyQuery(GET_STRIPE_BALANCE);

  const [getTotalCompletedJobs, { data: completedJobsData }] = useLazyQuery(
    GET_TOTAL_COMPLETED_JOBS
  );
  useEffect(() => {
    getStripeBalance();
    getTotalCompletedJobs();
  }, []);

  const cards = [
    {
      name: 'Available balance',
      icon: CashIcon,
      amount: `${
        (stripeBalanceData?.getStripeAccountBalance?.available[0]?.amount / 100) || 0
      } ${stripeBalanceData?.getStripeAccountBalance?.available[0]?.currency?.toUpperCase() || 'RON'}`,
    },
    {
      name: 'Pending balance',
      icon: ScaleIcon,
      amount: `${
        (stripeBalanceData?.getStripeAccountBalance?.pending[0]?.amount / 100) || 0
      } ${stripeBalanceData?.getStripeAccountBalance?.pending[0]?.currency?.toUpperCase() || 'RON'}`,
    },
    {
      name: 'Total jobs completed',
      icon: ScaleIcon,
      amount: completedJobsData?.getTotalCompletedJobs,
    },
  ];
  return (
    <>
      {cards.map((card) => (
        <div
          key={card.name}
          className='bg-white overflow-hidden shadow rounded-lg'
        >
          <div className='p-5'>
            <div className='flex items-center'>
              <div className='flex-shrink-0'>
                <card.icon
                  className='h-6 w-6 text-gray-400'
                  aria-hidden='true'
                />
              </div>
              <div className='ml-5 w-0 flex-1'>
                <dl>
                  <dt className='text-sm font-medium text-gray-500 truncate'>
                    {card.name}
                  </dt>
                  <dd>
                    <div className='text-lg font-medium text-gray-900'>
                      {card.amount}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default function Dashboard() {
  const auth: any = useAuth();
  const user = auth?.user;
  const {
    data: assignedJobs,
    loading: assignedJobsLoading,
    error: assignedJobsError,
    refetch: refetchAssignedJobs,
    fetchMore: fetchMoreAssignedJobs,
  } = useQuery(GET_ASSIGNED_JOBS, {
    variables: {
      input: {
        limit: LIMIT,
        offset: 0,
      },
    },
    skip: !user?._id || user?.userType === USER_TYPES.ORG || !user?.userType,
  });

  const {
    data: businessJobs,
    error: businessJobsError,
    loading: businessLoading,
    refetch: refetchBusinessJobs,
    fetchMore: fetchMoreBusinessJobs,
    variables: businessJobsVariables,
  } = useQuery(GET_CREATED_JOBS, {
    variables: {
      input: {
        userId: user?._id,
        limit: LIMIT,
        offset: 0,
      },
    },
    skip:
      !user?._id || user?.userType === USER_TYPES.CREATOR || !user?.userType,
  });

  const { data: businessJobsCount } = useQuery(GET_TOTAL_CREATED_JOBS, {
    skip: !user?._id || user?.userType !== USER_TYPES.ORG,
    variables: {
      userId: user?._id,
    },
  });

  const { data: creatorJobsCount } = useQuery(GET_TOTAL_ASSIGNED_JOBS, {
    skip: !user?._id || user?.userType !== USER_TYPES.CREATOR,
  });

  const data =
    user?.userType === USER_TYPES.CREATOR
      ? assignedJobs?.getJobsForCreator
      : businessJobs?.getJobsForBusinessUser;

  const fetchMore = () => {
    if (user?.userType === USER_TYPES.CREATOR) {
      fetchMoreAssignedJobs({
        variables: {
          input: {
            limit: LIMIT,
            offset: assignedJobs?.getJobsForCreator?.length,
          },
        },
      });
    } else {
      fetchMoreBusinessJobs({
        variables: {
          input: {
            ...businessJobsVariables?.input,
            limit: LIMIT,
            offset: businessJobs?.getJobsForBusinessUser?.length,
          },
        },
      });
    }
  };

  return (
    <div className='min-h-full'>
      {/* Static sidebar for desktop */}

      <main className='flex-1 pb-8'>
        {/* Page header */}

        <div className='mt-8'>
          <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
            <h2 className='text-lg leading-6 font-medium text-gray-900'>
              Overview
            </h2>
            <div className='mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3'>
              {/* Card */}
              {user?.userType === USER_TYPES.CREATOR ? <CreatorCards /> : null}
            </div>
          </div>

          <h2 className='max-w-6xl mx-auto mt-8 px-4 text-2xl leading-6 font-bold text-gray-900 sm:px-6 lg:px-8'>
            {user?.userType === USER_TYPES.CREATOR
              ? 'Assigned Jobs'
              : 'Created Jobs'}
          </h2>

          <ProjectList
            data={data}
            fetchMore={fetchMore}
            count={
              user?.userType === USER_TYPES.CREATOR
                ? creatorJobsCount?.getTotalAssignedJobs
                : businessJobsCount?.getTotalCreatedJobs
            }
          />
        </div>
      </main>
    </div>
  );
}
