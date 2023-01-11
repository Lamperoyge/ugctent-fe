import { CalendarIcon, UserGroupIcon } from '@heroicons/react/solid';
import { BeakerIcon, VideoCameraIcon } from '@heroicons/react/outline';

import { JOB_STATUS_LABELS_AND_COLORS } from 'utils/constants';
import Link from 'next/link';

const ProjectsList = ({ data }) => (
    <div className='bg-white shadow overflow-hidden sm:rounded-md w-full'>
      <ul role='list' className='divide-y divide-gray-200'>
        {data?.map((job) => {
          const jobStatusLabelData = JOB_STATUS_LABELS_AND_COLORS[job.status];
          return (
            <li key={job._id} className='cursor-pointer hover:bg-slate-100'>
              <Link
                href={`/projects/${job._id}`}
                className='block hover:bg-gray-50'>
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
                        <VideoCameraIcon
                          className='flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400'
                          aria-hidden='true'
                        />
                        <div className='flex flex-wrap gap-2 items-baseline'>
                          {job.skills?.slice(0,2).map((skill) => (
                            <span
                              className='border rounded-full py-1 px-3 text-xs mr-2 font-semibold text-white bg-primaryOrange items-center'
                              key={skill._id}
                            >
                              <span className='block truncate'>
                                {skill.label}
                              </span>
                            </span>
                          ))}
                          {job.skills?.length > 2 ?                             <span
                              className='border rounded-full py-1 px-3 text-xs mr-2 font-semibold text-slate-200 bg-slate-400 items-center'
                            >
                              <span className='block truncate'>
                                + {job.skills.length - 2}
                              </span>
                            </span>
 : null}
                        </div>
                      </p>
                      <p className='mt-2 flex items-center text-sm text-gray-600 sm:mt-0 sm:ml-6'>
                        <BeakerIcon
                          className='flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400'
                          aria-hidden='true'
                        />
                        {job.category?.label}
                      </p>
                      <p className='mt-2 flex items-center text-sm text-gray-600 sm:mt-0 sm:ml-6'>
                        <span
                          className='flex-shrink-0 mr-1.5 text-gray-400'
                          aria-hidden='true'
                        >
                          RON
                        </span>
                        {job.price}
                      </p>
                    </div>
                    <div className='mt-2 flex items-center text-sm text-gray-500 sm:mt-0'>
                      <UserGroupIcon
                        className='flex-shrink-0 mr-1.5 h-5 w-5 text-primaryOrange'
                        aria-hidden='true'
                      />
                      <p>{job.applicationsCount} applications</p>
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

export default ProjectsList;
