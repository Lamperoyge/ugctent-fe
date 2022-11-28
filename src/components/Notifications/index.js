import { BellIcon } from '@heroicons/react/outline';
import { useState, Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react'
import { useQuery } from '@apollo/client';
import { LIMIT } from 'utils/constants';
import {GET_NOTIFICATIONS} from 'graphql/queries'
import notificationBuilder from 'utils/helpers/notificationBuilder';
import Link from 'next/link';

const Notifications = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {data} = useQuery(GET_NOTIFICATIONS, {
    variables: {
        limit: LIMIT,
        offset: 0
    }
  })
  console.log(data)

  const toggle = () => setIsOpen((prev) => !prev);
  return (
    // <button
    //   type='button'
    //   onClick={toggle}
    //   className='bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
    // >
    //   <span className='sr-only'>View notifications</span>
    //   <BellIcon className='h-6 w-6' aria-hidden='true' />
    // </button>
    // <div className="fixed top-16 w-56 text-right">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          <span className='sr-only'>View notifications</span>
      <BellIcon className='h-6 w-6' aria-hidden='true' />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                {data?.getNotifications?.map((notification, idx) => {
                    const content = notificationBuilder(notification)
                    return (
                        <Menu.Item key={idx}>
                        <Link href={content.link}>
                            <div className="flex items-center px-4 py-3">
                                {content.title}
                                </div>
                        </Link>
                        </Menu.Item>
                    )
                })}
          </Menu.Items>
        </Transition>
      </Menu>
    // </div>
  
  );
};

export default Notifications;
