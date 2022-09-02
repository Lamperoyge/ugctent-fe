import {
  CalendarIcon,
  LocationMarkerIcon,
  UsersIcon,
} from '@heroicons/react/solid';
import { JOB_STATUS_LABELS_AND_COLORS } from 'utils/constants';
import Link from 'next/link';

const ProjectsList = ({ data }) => {
  return (
    <div className='bg-white shadow overflow-hidden sm:rounded-md w-full'>
      <ul role='list' className='divide-y divide-gray-200'>
        {data.map((job) => {
          const jobStatusLabelData = JOB_STATUS_LABELS_AND_COLORS[job.status];
          return (
            <li key={job._id} className="cursor-pointer hover:bg-slate-100">
              <Link href={`/projects/${job._id}`} className='block hover:bg-gray-50'>
                <div className='px-4 py-4 sm:px-6'>
                  <div className='flex items-center justify-between'>
                    <p className='text-sm font-medium text-secondary truncate'>
                      {job.title}
                    </p>
                    <div className='ml-2 flex-shrink-0 flex'>
                      <p
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${jobStatusLabelData.chipColor} ${jobStatusLabelData.textColor}`}
                      >
                        {jobStatusLabelData.label}
                      </p>
                    </div>
                  </div>
                  <div className='mt-2 sm:flex sm:justify-between'>
                    <div className='sm:flex'>
                      <p className='flex items-center text-sm text-gray-500'>
                        <UsersIcon
                          className='flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400'
                          aria-hidden='true'
                        />
                        {'Engineering'}
                      </p>
                      <p className='mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6'>
                        <LocationMarkerIcon
                          className='flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400'
                          aria-hidden='true'
                        />
                        {'Bucharest'}
                      </p>
                    </div>
                    <div className='mt-2 flex items-center text-sm text-gray-500 sm:mt-0'>
                      <CalendarIcon
                        className='flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400'
                        aria-hidden='true'
                      />
                      <p>22/12/2022</p>
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ProjectsList;
