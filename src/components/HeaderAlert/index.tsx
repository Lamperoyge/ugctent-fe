import { XIcon } from '@heroicons/react/outline';
import { MegaphoneIcon } from 'components/Icons';
export default function HeaderAlert({
  renderContent,
  btnTitle = 'Learn more',
  ctaAction,
  bgColor='bg-indigo-600'
}) {
  return (
    <div className={bgColor}>
      <div className='mx-auto max-w-7xl py-3 px-3 sm:px-6 lg:px-8'>
        <div className='flex flex-wrap items-center justify-between'>
          <div className='flex w-0 flex-1 items-center'>
            <span className={`flex rounded-lg p-2 ${bgColor}`}>
              <MegaphoneIcon
                color='white'
                aria-hidden='true'
              />
            </span>
            <p className='ml-3 truncate font-medium text-white'>
              {renderContent()}
            </p>
          </div>
          <div className='order-3 mt-2 w-full flex-shrink-0 sm:order-2 sm:mt-0 sm:w-auto'>
            <button
              type='button'
              onClick={ctaAction}
              className='flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-2 text-sm font-medium text-indigo-600 shadow-sm hover:bg-indigo-50'
            >
              {btnTitle}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
