import { ScaleIcon } from '@heroicons/react/outline';
import { CashIcon, ChevronRightIcon } from '@heroicons/react/solid';
import { classNames } from 'utils/helpers';
import { useAuth } from 'hooks';
import ProfilePicture from 'components/ProfilePicture';
import { useQuery } from '@apollo/client';
import { GET_ASSIGNED_JOBS } from 'graphql/queries';
import { LIMIT } from 'utils/constants';
import ProjectList from './ProjectsList';

const cards = [
  { name: 'Total gained', href: '#', icon: ScaleIcon, amount: 'RON 30,659.45' },
  // More items...
];
const transactions = [
  {
    id: 1,
    name: 'Payment to Molly Sanders',
    href: '#',
    amount: '$20,000',
    currency: 'USD',
    status: 'success',
    date: 'July 11, 2020',
    datetime: '2020-07-11',
  },
  // More transactions...
];

const statusStyles = {
  success: 'bg-green-100 text-green-800',
  processing: 'bg-yellow-100 text-yellow-800',
  failed: 'bg-gray-100 text-gray-800',
};

export default function Dashboard() {
  const auth = useAuth();
  const user = auth?.user;
  const { data, loading, error } = useQuery(GET_ASSIGNED_JOBS, {
    variables: {
      input: {
        limit: LIMIT,
        offset: 0,
      },
    },
    skip: !user?._id,
  });

  console.log(data, loading);
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
                  <div className='bg-gray-50 px-5 py-3'>
                    <div className='text-sm'>
                      <a
                        href={card.href}
                        className='font-medium text-cyan-700 hover:text-cyan-900'
                      >
                        View all
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <h2 className='max-w-6xl mx-auto mt-8 px-4 text-lg leading-6 font-medium text-gray-900 sm:px-6 lg:px-8'>
            Assigned projects
          </h2>

          {/* Activity list (smallest breakpoint only) */}
          <div className='shadow sm:hidden'>
            <ul
              role='list'
              className='mt-2 divide-y divide-gray-200 overflow-hidden shadow sm:hidden'
            >
              {transactions.map((transaction) => (
                <li key={transaction.id}>
                  <a
                    href={transaction.href}
                    className='block px-4 py-4 bg-white hover:bg-gray-50'
                  >
                    <span className='flex items-center space-x-4'>
                      <span className='flex-1 flex space-x-2 truncate'>
                        <CashIcon
                          className='flex-shrink-0 h-5 w-5 text-gray-400'
                          aria-hidden='true'
                        />
                        <span className='flex flex-col text-gray-500 text-sm truncate'>
                          <span className='truncate'>{transaction.name}</span>
                          <span>
                            <span className='text-gray-900 font-medium'>
                              {transaction.amount}
                            </span>{' '}
                            {transaction.currency}
                          </span>
                          <time dateTime={transaction.datetime}>
                            {transaction.date}
                          </time>
                        </span>
                      </span>
                      <ChevronRightIcon
                        className='flex-shrink-0 h-5 w-5 text-gray-400'
                        aria-hidden='true'
                      />
                    </span>
                  </a>
                </li>
              ))}
            </ul>

          </div>

          {/* Activity table (small breakpoint and up) */}
                <ProjectList data={data?.getJobsForCreator}/>
        </div>
      </main>
    </div>
  );
}
