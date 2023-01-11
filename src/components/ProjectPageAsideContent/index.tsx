/* eslint-disable jsx-a11y/anchor-is-valid */
import { CalendarIcon, ChatAltIcon } from '@heroicons/react/solid';
import StatusChip from 'components/StatusChip';
import { JOB_STATUS } from 'utils/constants';
import { CurrencyDollarIcon } from '@heroicons/react/outline';
import Skills from 'components/JobsPageComponents/skills';
import Category from 'components/JobsPageComponents/category';
import Assignee from 'components/JobsPageComponents/assignee';

function ProjectPageAsideContent({ job, canViewAssignedPerson }) {
  return (
    <aside className='hidden xl:block xl:pl-8'>
      <h2 className='sr-only'>Details</h2>
      <div className='space-y-5'>
        <div className='flex items-center space-x-2'>
          <StatusChip status={job.status} />
        </div>
        <div className='flex items-center space-x-2'>
          <ChatAltIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
          <span className='text-gray-900 text-sm font-medium'>
            {job?.applicationsCount || 0} applications
          </span>
        </div>
        <div className='flex items-center space-x-2'>
          <CalendarIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
          <span className='text-gray-900 text-sm font-medium'>
            Created on{' '}
            <time dateTime='2020-12-02'>
              {new Date(parseInt(job.createdAt)).toLocaleDateString()}
            </time>
          </span>
        </div>
        {job.createdAt !== job.updatedAt && (
          <div className='flex items-center space-x-2'>
            <CalendarIcon
              className='h-5 w-5 text-gray-400'
              aria-hidden='true'
            />
            <span className='text-primaryOrange text-sm font-medium'>
              Last update{' '}
              <time dateTime='2020-12-02'>
                {new Date(parseInt(job.updatedAt)).toLocaleDateString()}
              </time>
            </span>
          </div>
        )}
        <div className='flex items-center space-x-2'>
          <CurrencyDollarIcon
            className='h-5 w-5 text-gray-400'
            aria-hidden='true'
          />
          <span className='text-gray-900 text-sm font-medium'>
            {[
              JOB_STATUS.IN_PROGRESS,
              JOB_STATUS.IN_REVIEW,
              JOB_STATUS.COMPLETED,
            ].includes(job?.status)
              ? 'Paid'
              : 'Not paid'}
          </span>
          <span className='text-gray-900 text-sm font-medium'>
            {job?.price} RON
          </span>
        </div>
      </div>
      <div className='mt-6 border-t border-gray-200 py-6 space-y-8'>
        {canViewAssignedPerson && <Assignee job={job} />}
        {job.skills && <Skills job={job} />}
        {job.category && <Category job={job} />}
      </div>
    </aside>
  );
}

export default ProjectPageAsideContent;
