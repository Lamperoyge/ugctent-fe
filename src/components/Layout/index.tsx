import { Dialog, Menu, Transition } from '@headlessui/react';
import { HomeIcon, MenuAlt2Icon } from '@heroicons/react/outline';
import { SearchIcon } from '@heroicons/react/solid';
import { Fragment, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import {
  CurrencyDollarIcon,
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
import { MissingStripeAnnouncement } from './Helpers';
import Notifications from 'components/Notifications';
import ProfilePicture from 'components/ProfilePicture';
import Spotlight from 'components/Spotlight';
import AddCompanyDetails from 'components/AddCompanyDetails';

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { user, isStripeVerified }:any = useAuth();
  const [openCompanyDetailsModal, setOpenCompanyDetailsModal] = useState(false);

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
    {
      name: 'Talents',
      href: '/explore/talents',
      icon: PuzzleIcon,
      current: router.pathname === '/explore/talents',
    },
  ];

  const userNavigation = [
    { name: 'Your Profile', href: `/profile/${user?._id}` },
    { name: 'Sign out', onClick: logout },
  ];

  const CREATOR_NAVIGATION = useMemo(() => {
    const nav:any = [
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
          router.asPath.includes('projects') ||
          router.asPath.includes('explore'),
      },
    ];

    if (isStripeVerified) {
      nav.push({
        name: 'Finances',
        action: getStripeDashboardLink,
        icon: CurrencyDollarIcon,
        current: false,
        as: 'button',
      });
    }
    return nav;
  }, [router, isStripeVerified, getStripeDashboardLink]);

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

  const handleAlertClick = () => {
    if(!user) return null;
    if(!user?.userInfo?.taxId) {
      return setOpenCompanyDetailsModal(true)
    }
    return router.push('/verify', undefined, { shallow: true });

  }
  return (
    <>
      {isNewProjectModalOpen && (
        <CreateProjectModal
          open={isNewProjectModalOpen}
          onClose={onModalClose}
        />
      )}
      {openCompanyDetailsModal ? <AddCompanyDetails onClose={() => setOpenCompanyDetailsModal(false)}/> : null}
      <div className="h-full">
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as='div'
            className='fixed inset-0 z-40 flex md:hidden'
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
              <div className='relative max-w-xs w-full bg-white pt-5 pb-4 flex-1 flex flex-col'>
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
                <div className='flex-shrink-0 px-4 flex items-center'>
                  <Logo className='h-8 w-auto' src='/black-orange.svg' />
                </div>
                <div className='mt-5 flex-1 h-0 overflow-y-auto'>
                  <div className='px-2'>
                    <nav className='space-y-2'>
                      {navigation?.map((item) =>
                        item?.href ? (
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
                                item.current
                                  ? 'text-gray-500'
                                  : 'text-gray-400 group-hover:text-gray-500',
                                'mr-4 flex-shrink-0 h-6 w-6'
                              )}
                              aria-hidden='true'
                            />
                            {item.name}
                          </Link>
                        ) : (
                          <button
                            onClick={item.action}
                            className={classNames(
                              item.current
                                ? 'bg-gray-100 text-gray-900'
                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                              'group rounded-md py-2 px-2 flex items-center text-base font-medium w-full'
                            )}
                          >
                            <span>{item.name}</span>
                          </button>
                        )
                      )}
                    </nav>
                  </div>
                  {user?.userType === USER_TYPES.ORG ? (
                    <button
                      type='button'
                      onClick={() => {
                        setNewProjectModalOpen(true);
                        setSidebarOpen(false);
                      }}
                      className='inline-flex mt-12 items-center w-full justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-secondary hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary'
                    >
                      <PlusIcon
                        className='-ml-1 mr-2 h-5 w-5'
                        aria-hidden='true'
                      />
                      New Project
                    </button>
                  ) : null}
                </div>
              </div>
            </Transition.Child>
            <div className='flex-shrink-0 w-14'>
              {/* Dummy element to force sidebar to shrink to fit close icon */}
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className='hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0'>
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className='border-r border-gray-200 pt-5 flex flex-col flex-grow bg-white overflow-y-auto'>
            <div className='flex-shrink-0 px-4 flex items-center'>
              <Logo className='h-8 w-auto' src='/black-orange.svg' />
            </div>
            <div className='flex-grow mt-5 flex flex-col'>
              <div className='flex-1 px-2 pb-4'>
                <nav className='space-y-2'>
                  {navigation?.map((item) =>
                    item?.href ? (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                          'group rounded-md py-2 px-2 flex items-center text-sm font-medium'
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
                      </Link>
                    ) : (
                      <button
                        onClick={item.action}
                        className={classNames(
                          item.current
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                          'group rounded-md py-2 px-2 flex items-center text-base font-medium w-full'
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
                        <span className='text-sm font-medium font-inherit'>
                          {item.name}
                        </span>
                      </button>
                    )
                  )}
                </nav>
                {user?.userType === USER_TYPES.ORG ? (
                  <button
                    type='button'
                    onClick={() => setNewProjectModalOpen(true)}
                    className='inline-flex mt-12 items-center w-full justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-secondary hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary'
                  >
                    <PlusIcon
                      className='-ml-1 mr-2 h-5 w-5'
                      aria-hidden='true'
                    />
                    New Project
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
        <div className='md:pl-64 h-full'>
          <div className='mx-auto flex flex-col md:px-8 xl:px-0 h-full'>
            <div className='sticky top-0 z-10 '>
              {displayAnnouncement && (
                <HeaderAlert
                  bgColor={user?.userInfo?.taxId ? 'bg-indigo-600' : 'bg-primaryOrange'}
                  btnTitle={user?.userInfo?.taxId ? 'Verify now' : 'Add company details'}
                  ctaAction={() => {
                    handleAlertDismiss();
                    handleAlertClick()
                  }}
                  renderContent={() => <MissingStripeAnnouncement user={user}/>}
                />
              )}

              <div className='flex-shrink-0 h-16 bg-white border-b border-gray-200 flex px-4'>
                <button
                  type='button'
                  className='border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden'
                  onClick={() => setSidebarOpen(true)}
                >
                  <span className='sr-only'>Open sidebar</span>
                  <MenuAlt2Icon className='h-6 w-6' aria-hidden='true' />
                </button>
                <div className='flex-1 flex justify-between px-4 md:px-0'>
                  <div className='flex-1 flex'>
                    <div className='w-full flex md:ml-0'>
                      <label htmlFor='search-field' className='sr-only'>
                        Search
                      </label>
                      <Spotlight />
                    </div>
                  </div>
                  <div className='ml-4 flex items-center md:ml-6'>
                    <Notifications />
                    {/* Profile dropdown */}
                    <Menu as='div' className='ml-3 relative'>
                      <div>
                        <Menu.Button className='max-w-xs flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
                          <span className='sr-only'>Open user menu</span>
                          <ProfilePicture
                            src={profilePicture}
                            size='h-8 w-8'
                          />
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
                        <Menu.Items className='origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 focus:outline-none'>
                          {userNavigation.map((item) => (
                            <Menu.Item key={item.name}>
                              {({ active }) =>
                                item.href ? (
                                  <Link
                                    href={item.href}
                                    className={classNames(
                                      active ? 'bg-gray-100' : '',
                                      'block py-2 px-4 text-sm text-gray-700'
                                    )}
                                  >
                                    {item.name}
                                  </Link>
                                ) : (
                                  <button
                                    onClick={item.onClick}
                                    className='block text-left hover:bg-gray-100 py-2 px-4 text-sm text-gray-700 w-full'
                                  >
                                    {item.name}
                                  </button>
                                )
                              }
                            </Menu.Item>
                          ))}
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </div>
              </div>
            </div>

            <main className='flex-1 h-full w-full'>
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
  );
}
