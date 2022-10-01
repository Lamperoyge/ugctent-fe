import { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Dialog, Transition } from '@headlessui/react';
import {
  CurrencyDollarIcon,
  HomeIcon,
  MenuIcon,
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


export default function SidebarLayout({ children }) {
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
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const ORG_NAVIGATION = [
    {
      name: 'Projects',
      href: '/projects',
      icon: HomeIcon,
      current: router.asPath.includes('projects'),
    },
  ];

  const CREATOR_NAVIGATION = [
    {
      name: 'Explore',
      href: '/explore',
      icon: HomeIcon,
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
      {isNewProjectModalOpen && (
        <CreateProjectModal
          open={isNewProjectModalOpen}
          onClose={onModalClose}
        />
      )}
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as='div'
            className='fixed inset-0 flex z-40 md:hidden'
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter='transition-opacity ease-linear duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='transition-opacity ease-linear duration-300'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <Dialog.Overlay className='fixed inset-0 bg-gray-600 bg-opacity-75' />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter='transition ease-in-out duration-300 transform'
              enterFrom='-translate-x-full'
              enterTo='translate-x-0'
              leave='transition ease-in-out duration-300 transform'
              leaveFrom='translate-x-0'
              leaveTo='-translate-x-full'
            >
              <div className='relative flex-1 flex flex-col max-w-xs w-full bg-white'>
                <Transition.Child
                  as={Fragment}
                  enter='ease-in-out duration-300'
                  enterFrom='opacity-0'
                  enterTo='opacity-100'
                  leave='ease-in-out duration-300'
                  leaveFrom='opacity-100'
                  leaveTo='opacity-0'
                >
                  <div className='absolute top-0 right-0 -mr-12 pt-2'>
                    <button
                      type='button'
                      className='ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className='sr-only'>Close sidebar</span>
                      <XIcon
                        className='h-6 w-6 text-white'
                        aria-hidden='true'
                      />
                    </button>
                  </div>
                </Transition.Child>
                <div className='flex-1 h-0 pt-5 pb-4 overflow-y-auto'>
                  <div className='flex-shrink-0 flex items-center px-4'>
                    <Logo className='h-8 w-auto' src='/black-orange.svg' />
                  </div>
                  <Navbar
                    classNames={classNames}
                    setNewProjectModalOpen={setNewProjectModalOpen}
                  />
                </div>
                <button
                  type='button'
                  onClick={logout}
                  className='inline-flex items-center w-full justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-gray-400 bg-gray-100 hover:bg-red-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary'
                >
                  Log out
                </button>

                <div className='flex-shrink-0 flex border-t border-gray-200 p-4'>
                  <Link
                    href={`/profile/${user._id}`}
                    className='flex-shrink-0 group block'
                  >
                    {profilePicture ? (
                      <img
                        className='inline-block h-9 w-9 rounded-full'
                        src={profilePicture}
                        alt=''
                      />
                    ) : (
                      <span className='inline-block h-9 w-9 rounded-full overflow-hidden bg-gray-100'>
                        <svg
                          className='h-full w-full text-gray-300'
                          fill='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path d='M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z' />
                        </svg>
                      </span>
                    )}
                  </Link>
                  <div className='ml-3'>
                    <p className='text-sm font-medium text-gray-700 group-hover:text-gray-900'>
                      {user?.userInfo?.firstName}
                    </p>
                    <p className='text-xs font-medium text-gray-500 group-hover:text-gray-700'>
                      View profile
                    </p>
                  </div>
                </div>
              </div>
            </Transition.Child>
            <div className='flex-shrink-0 w-14'>
              {/* Force sidebar to shrink to fit close icon */}
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className='hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0'>
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className='flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white'>
            <div className='flex-1 flex flex-col pt-5 pb-4 overflow-y-auto'>
              <div className='flex items-center flex-shrink-0 px-4'>
                <Logo className='h-8 w-auto' src='/black-orange.svg' />
              </div>
              <nav className='mt-5 flex-1 px-2 bg-white space-y-1'>
                {navigation.map((item, idx) => (
                  <NavItemWrapper
                    href={item.href}
                    key={idx}
                    as={item.as}
                    action={item.action}
                  >
                    <a
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        item.current
                          ? 'bg-gray-100 text-gray-900'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                        'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                      )}
                    >
                      <item.icon
                        className={classNames(
                          item.current
                            ? 'text-gray-500'
                            : 'text-gray-400 group-hover:text-gray-500',
                          'mr-3 flex-shrink-0 h-6 w-6'
                        )}
                        aria-hidden='true'
                      />
                      {item.name}
                    </a>
                  </NavItemWrapper>
                ))}
                <div className='pt-12 w-full'>
                  <button
                    type='button'
                    onClick={() => setNewProjectModalOpen(true)}
                    className='inline-flex w-full justify-center items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-secondary hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary'
                  >
                    <PlusIcon
                      className='-ml-1 mr-2 h-5 w-5'
                      aria-hidden='true'
                    />
                    New Project
                  </button>
                </div>
              </nav>
            </div>
            <button
              type='button'
              onClick={logout}
              className='inline-flex items-center w-full justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-gray-400 bg-gray-100 hover:bg-red-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary'
            >
              Log out
            </button>

            <div className='flex-shrink-0 flex border-t border-gray-200 p-4'>
              <Link
                href={`/profile/${user?.userInfo?.userId}`}
                className='flex-shrink-0 w-full group block'
                passHref
              >
                <a href={`/profile/${user?.userInfo?.userId}`}>
                  <div className='flex items-center'>
                    <div>
                      {profilePicture ? (
                        <img
                          className='inline-block h-9 w-9 rounded-full'
                          src={profilePicture}
                          alt=''
                        />
                      ) : (
                        <span className='inline-block h-9 w-9 rounded-full overflow-hidden bg-gray-100'>
                          <svg
                            className='h-full w-full text-gray-300'
                            fill='currentColor'
                            viewBox='0 0 24 24'
                          >
                            <path d='M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z' />
                          </svg>
                        </span>
                      )}
                    </div>
                    <div className='ml-3'>
                      <p className='text-sm font-medium text-gray-700 group-hover:text-gray-900'>
                        {user?.userInfo?.firstName}
                      </p>
                      <p className='text-xs font-medium text-gray-500 group-hover:text-gray-700'>
                        View profile
                      </p>
                    </div>
                  </div>
                </a>
              </Link>
            </div>
          </div>
        </div>
        <div className='md:pl-64 flex flex-col flex-1 h-full w-full'>
          <div className='sticky top-0 z-10 md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-white'>
            <button
              type='button'
              className='-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary'
              onClick={() => setSidebarOpen(true)}
            >
              <span className='sr-only'>Open sidebar</span>
              <MenuIcon className='h-6 w-6' aria-hidden='true' />
            </button>
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
    </>
  );
}

