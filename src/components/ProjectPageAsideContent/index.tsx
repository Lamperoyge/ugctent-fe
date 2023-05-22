/* eslint-disable jsx-a11y/anchor-is-valid */
import { CalendarIcon, ChatAltIcon } from '@heroicons/react/solid';
import StatusChip from 'components/StatusChip';
import { JOB_STATUS } from 'utils/constants';
import { CurrencyDollarIcon } from '@heroicons/react/outline';
import Skills from 'components/JobsPageComponents/skills';
import Category from 'components/JobsPageComponents/category';
import Assignee from 'components/JobsPageComponents/assignee';
import { useMemo } from 'react';
import ManageInvoice from 'components/ManageInvoice';

function ProjectPageAsideContent({ job, canViewAssignedPerson, children }) {
  const asideDetails: any = useMemo(() => {
    const items = [
      {
        label: 'Status',
        value: job?.status,
        component: () => <StatusChip status={job?.status} />,
      },
      {
        label: 'Assignee',
        value: job?.assignee,
        component: () => <Assignee job={job} />,
        condition: !!job?.assignee && canViewAssignedPerson,
      },
      {
        label: [
          JOB_STATUS.IN_PROGRESS,
          JOB_STATUS.IN_REVIEW,
          JOB_STATUS.COMPLETED,
        ].includes(job?.status)
          ? 'Paid'
          : 'Left to pay',
        value: job?.price,
        component: () => (
          <div className='flex flex-col'>
            <div className='px-2 inline-flex text-xs leading-5 font-bold rounded-full bg-green-200 text-green-800'>
              {job?.price} RON
            </div>
            {/* <span className="text-xs text-gray-400">
            You will receive this amount minus the platform fee (10%) and payment processing fees (2.5%). - You will receive RON{job?.price - job?.price * 0.1 - job?.price * 0.025}

            </span> */}
          </div>
        ),
      },

      {
        label: 'Applications',
        value: job?.applicationsCount || 0,
      },
      {
        label: 'Created',
        value: new Date(parseInt(job.createdAt)).toLocaleDateString(),
      },
      {
        label: 'Last update',
        value: new Date(parseInt(job.updatedAt)).toLocaleDateString(),
      },
      {
        label: 'Category',
        value: job?.category,
        component: () => <Category job={job} />,
        condiition: !!job?.category,
      },
    ];

    return items?.filter((item) => item?.condition !== false);
  }, [job, canViewAssignedPerson]);

  return (
    <aside className='block xl:pl-8'>
      <div className='flex gap-8 items-left justify-center flex-col'>
        {asideDetails.map((item, key) => {
          return (
            <div className='flex gap-4 justify-between'>
              <span className='font-semibold text-sm text-gray-500'>
                {item.label}
              </span>
              {item?.component ? (
                item.component()
              ) : (
                <div className='px-2 inline-flex text-xs leading-5 font-bold rounded-full bg-blue-200 text-blue-800'>
                  {item.value}
                </div>
              )}
            </div>
          );
        })}
      </div>
      {/* <div className='space-y-5'>
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
      </div> */}
      {children}
    </aside>
  );
}

export default ProjectPageAsideContent;
