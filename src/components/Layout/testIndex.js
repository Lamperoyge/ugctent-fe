/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { Dialog, Menu, Transition } from '@headlessui/react'
import {
  BellIcon,
  CalendarIcon,
  ChartBarIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  MenuAlt2Icon,
  UsersIcon,
} from '@heroicons/react/outline'
import { SearchIcon } from '@heroicons/react/solid'
import { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  CurrencyDollarIcon,
  MenuIcon,
  PuzzleIcon,
  XIcon,
} from '@heroicons/react/outline';
import { classNames } from 'utils/helpers';
import { EXCLUDED_PATHS, USER_TYPES } from 'utils/constants';
import { useAuth } from 'hooks';
import Link from 'next/link';
import CreateProjectModal from 'components/CreateProject';
import { PlusIcon } from '@heroicons/react/solid';
import Logo from 'components/Shared/Logo';
import { logout } from 'components/Auth';
import HeaderAlert from 'components/HeaderAlert';
import { useLazyQuery } from '@apollo/client';
import { GET_STRIPE_DASHBOARD_LINK } from 'graphql/queries';
import { Navbar, MissingStripeAnnouncement, NavItemWrapper } from './Helpers';

const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
]

export default function Example({children}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const { user, isStripeVerified } = useAuth();
  const [isNewProjectModalOpen, setNewProjectModalOpen] = useState(false);
  const [getStripeDashboardLink] = useLazyQuery(GET_STRIPE_DASHBOARD_LINK, {
    onCompleted: (data) => {
      window.open(data.getStripeDashboardLink);
    },
  });
  const [displayAnnouncement, setDisplayAnnouncement] = useState(
    !isStripeVerified && user?.userType === USER_TYPES.CREATOR
  );
  const profilePicture = user?.userInfo?.profilePicture;
  const router = useRouter();

  const ORG_NAVIGATION = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: HomeIcon,
      current:
        router.asPath.includes('dashboard') ||
        router.asPath.includes('projects'),
    },
  ];

  const CREATOR_NAVIGATION = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: HomeIcon,
      current: router.asPath.includes('dashboard'),
    },
    {
      name: 'Explore',
      href: '/explore',
      icon: PuzzleIcon,
      current:
        router.asPath.includes('projects') || router.asPath.includes('explore'),
    },
    {
      name: 'Financials',
      action: getStripeDashboardLink,
      icon: CurrencyDollarIcon,
      current: false,
      as: 'button',
    },
  ];

  const navigation =
    user?.userType === USER_TYPES.ORG ? ORG_NAVIGATION : CREATOR_NAVIGATION;
  // TODO : CHANGE THIS - really just no time and too lazy to move to constants
  if (
    EXCLUDED_PATHS.includes(router.pathname) ||
    router.pathname.includes('/onboarding')
  )
    return children;

  const onModalClose = () => setNewProjectModalOpen(false);

  const handleAlertDismiss = () => setDisplayAnnouncement(false);
  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full">
        <body class="h-full">
        ```
      */}
      {isNewProjectModalOpen && (
        <CreateProjectModal
          open={isNewProjectModalOpen}
          onClose={onModalClose}
        />
      )}

      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog as="div" className="fixed inset-0 z-40 flex md:hidden" onClose={setSidebarOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <div className="relative max-w-xs w-full bg-white pt-5 pb-4 flex-1 flex flex-col">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 -mr-12 pt-2">
                    <button
                      type="button"
                      className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex-shrink-0 px-4 flex items-center">
                <Logo className='h-8 w-auto' src='/black-orange.svg' />
                </div>
                <div className="mt-5 flex-1 h-0 overflow-y-auto">
                <nav className="px-2 space-y-1">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                          'group rounded-md py-2 px-2 flex items-center text-base font-medium'
                        )}
                      >
                        <item.icon
                          className={classNames(
                            item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                            'mr-4 flex-shrink-0 h-6 w-6'
                          )}
                          aria-hidden="true"
                        />
                        {item.name}
                      </Link>
                    ))}
                  </nav>

                </div>
              </div>
            </Transition.Child>
            <div className="flex-shrink-0 w-14">{/* Dummy element to force sidebar to shrink to fit close icon */}</div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="border-r border-gray-200 pt-5 flex flex-col flex-grow bg-white overflow-y-auto">
            <div className="flex-shrink-0 px-4 flex items-center">
            <Logo className='h-8 w-auto' src='/black-orange.svg' />
            </div>
            <div className="flex-grow mt-5 flex flex-col">
              <nav className="flex-1 px-2 pb-4 space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      item.current ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                      'group rounded-md py-2 px-2 flex items-center text-sm font-medium'
                    )}
                  >
                    <item.icon
                      className={classNames(
                        item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                        'mr-3 flex-shrink-0 h-6 w-6'
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                ))}
              </nav>
              <button
          type='button'
          onClick={() => setNewProjectModalOpen(true)}
          className='inline-flex items-center w-full justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-secondary hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary'
        >
          <PlusIcon className='-ml-1 mr-2 h-5 w-5' aria-hidden='true' />
          New Project
        </button>

            </div>
          </div>
        </div>

        <div className="md:pl-64">
          <div className="max-w-6xl mx-auto flex flex-col md:px-8 xl:px-0">
            <div className="sticky top-0 z-10 flex-shrink-0 h-16 bg-white border-b border-gray-200 flex">
              <button
                type="button"
                className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <span className="sr-only">Open sidebar</span>
                <MenuAlt2Icon className="h-6 w-6" aria-hidden="true" />
              </button>
              <div className="flex-1 flex justify-between px-4 md:px-0">
                <div className="flex-1 flex">
                  <form className="w-full flex md:ml-0" action="#" method="GET">
                    <label htmlFor="search-field" className="sr-only">
                      Search
                    </label>
                    <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center">
                        <SearchIcon className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <input
                        id="search-field"
                        className="block h-full w-full border-transparent py-2 pl-8 pr-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm"
                        placeholder="Search"
                        type="search"
                        name="search"
                      />
                    </div>
                  </form>
                </div>
                <div className="ml-4 flex items-center md:ml-6">
                  <button
                    type="button"
                    className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>

                  {/* Profile dropdown */}
                  <Menu as="div" className="ml-3 relative">
                    <div>
                      <Menu.Button className="max-w-xs flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-8 w-8 rounded-full"
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          alt=""
                        />
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
                      <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 focus:outline-none">
                        {userNavigation.map((item) => (
                          <Menu.Item key={item.name}>
                            {({ active }) => (
                              <a
                                href={item.href}
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block py-2 px-4 text-sm text-gray-700'
                                )}
                              >
                                {item.name}
                              </a>
                            )}
                          </Menu.Item>
                        ))}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>

            <main className='flex-1 h-full w-full'>
            {displayAnnouncement && (
              <HeaderAlert
                btnTitle={'Verify now'}
                ctaAction={() => {
                  handleAlertDismiss();
                  router.push('/verify', undefined, { shallow: true });
                }}
                renderContent={() => <MissingStripeAnnouncement />}
              />
            )}
            <div className='py-6 h-full w-full'>
              <div className='mx-auto px-4 sm:px-6 md:px-8' />
              <div className='mx-auto px-4 sm:px-6 md:px-8 h-full w-full'>
                <div className='py-4 h-full w-full'>{children}</div>
              </div>
            </div>
          </main>
          </div>
        </div>
      </div>
    </>
  )
}
