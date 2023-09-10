import Link from 'next/link';
import { classNames } from 'utils/helpers';
import { PlusIcon } from '@heroicons/react/solid';

export function Navbar({ navigation, classNames, setNewProjectModalOpen }) {
  return (
    <nav className='mt-5 px-2 space-y-1'>
      {navigation?.map((item) => (
        <NavItemWrapper
          key={item.name}
          href={item.href}
          as={item.as}
          action={item.action}
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
        </NavItemWrapper>
      ))}
      <div className='pt-6 w-full'>
        <button
          type='button'
          onClick={() => setNewProjectModalOpen(true)}
          className='inline-flex items-center w-full justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-secondary hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary'
        >
          <PlusIcon className='-ml-1 mr-2 h-5 w-5' aria-hidden='true' />
          New Project
        </button>
      </div>
    </nav>
  );
}

export const MissingStripeAnnouncement = ({user}) => {
  if(!user) return null;
  const btnTitle = !user.userInfo?.taxId ? 'Add company details' : 'Verify your account!'
  const title  = !user.userInfo?.taxId ? 'Add company details to be able to receive payments on the platform' : 'Verify your account to be able to apply for jobs and receive payments.'
  return (
    <>
      <span className='md:hidden'>{btnTitle}</span>
      <span className='hidden md:inline'>
        {title}
      </span>{' '}
    </>
  );
}

export const NavItemWrapper = ({ as = 'link', ...props }) => {
  if (as === 'link') {
    return <Link href={props.href} legacyBehavior>{props.children}</Link>;
  }
  if (as === 'button') {
    return (
      <button onClick={props.action} className='border-0 w-full'>
        {props.children}
      </button>
    );
  }
  return props.children;
};
