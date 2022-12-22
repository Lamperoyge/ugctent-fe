import { BellIcon } from '@heroicons/react/outline';
import { useState, Fragment, useEffect } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { useLazyQuery, useQuery } from '@apollo/client';
import { LIMIT } from 'utils/constants';
import { GET_NOTIFICATIONS } from 'graphql/queries';
import notificationBuilder from 'utils/helpers/notificationBuilder';
import Link from 'next/link';
import { sinceDate } from 'utils/helpers/dateFormatter';
import ProfilePicture from 'components/ProfilePicture';
import InfiniteScroll from 'components/InfiniteScroll';

const Notifications = () => {
  const [hasMore, setHasMore] = useState(true);
  const [getNotifications, { data, fetchMore, loading }] = useLazyQuery(
    GET_NOTIFICATIONS,
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
        offset: data?.getNotifications?.length,
      },
    }).then(({ data }) => {
      setHasMore(data?.getNotifications?.length >= LIMIT);
    });
  useEffect(() => {
    getNotifications();
  }, []);

  const notificationsData = data?.getNotifications

  
  return (
    <Menu as='div' className='relative inline-block text-left'>
      <div>
        <Menu.Button className='bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
          <span className='sr-only'>View notifications</span>
          <BellIcon className='h-6 w-6' aria-hidden='true' />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        <Menu.Items className='absolute right-0 w-96 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
          <InfiniteScroll
            onLoadMore={handleFetchMore}
            hasMore={hasMore}
          >
            <ul role='list' className='divide-y divide-gray-200' style={{minHeight: '100px'}}>
            {!notificationsData?.length && !loading ? <span className="py-8 h-full w-full flex flex-col gap-4 justify-center items-center text-md text-gray-600">

            <span>{`:(`}</span>
            No notifications yet
            </span> : null}
              {data?.getNotifications.map((notification, idx) => {
                const content = notificationBuilder(notification);
                if (!content) return null;
                return (
                  <Link href={content.link}>
                    <li
                      key={notification?._id}
                      className='p-4 hover:bg-gray-100'
                    >
                      <div className='flex space-x-3'>
                        <ProfilePicture
                          size='h-6 w-6'
                          src={content?.avatar}
                          alt=''
                        />
                        <div className='flex-1 space-y-1'>
                          <div className='flex items-center justify-between'>
                            <h3 className='text-sm font-medium'>
                              {content?.fullName}
                            </h3>
                            <p className='text-sm text-gray-500'>
                              {sinceDate(parseInt(notification?.createdAt, 10))}
                            </p>
                          </div>
                          <p className='text-sm text-gray-500 whitespace-pre-line'>
                            {content?.title}
                          </p>
                          <p className='text-xs text-gray-300 whitespace-pre-line'>
                            {content?.subtitle}
                          </p>
                        </div>
                      </div>
                    </li>
                  </Link>
                );
              })}
            </ul>
          </InfiniteScroll>
        </Menu.Items>
      </Transition>
    </Menu>
    // </div>
  );
};

export default Notifications;
