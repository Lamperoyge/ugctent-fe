import { LightSpinner } from 'components/Shared/Spinner';
import Link from 'next/link';
import { XCircleIcon } from '@heroicons/react/solid';

export const InvalidApplication = ({ jobId, entity ="application" }) => (
  <div className='w-full h-full flex justify-center items-center flex-col gap-4'>
    <span className='font-bold text-gray-600'>
      Woops! Something went wrong. This {entity} is either invalid or you do
      not have rights to view
    </span>
    <XCircleIcon className='text-red-400 w-24 h-24' />
    <Link href={`/projects/${jobId}`}>
      <button className='font-bold inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm rounded-md text-white bg-secondary hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary'>
        Back to project page
      </button>
    </Link>
  </div>
);

export const LoadingState = () => (
  <div className='h-full w-full flex justify-center items-center'>
    <LightSpinner />
  </div>
);
