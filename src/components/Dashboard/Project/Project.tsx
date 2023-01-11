//@ts-nocheck
import Link from 'next/link';
import StatusChip from '../../StatusChip';

export const Project = ({ project }) => (
  <tr key={project._id} className='bg-white'>
    <td className='max-w-0 w-full px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
      <div className='flex'>
        <Link
          href={`/projects/${project._id}`}
          className='group inline-flex space-x-2 truncate text-sm'
        >
          <p className='text-gray-500 truncate group-hover:text-gray-900'>
            {project.title}
          </p>
        </Link>
      </div>
    </td>
    <td className='px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500'>
      <span className='text-gray-900 font-medium'>{project.amount} </span>
      RON
    </td>
    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
      <StatusChip status={project.status} />
    </td>
    <td className='px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500'>
      {project?.applicationsCount} applied
    </td>
    <td className='px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500'>
      <time dateTime={new Date(parseInt(project.updatedAt, 10))}>
        {new Date(parseInt(project.updatedAt, 10)).toLocaleDateString()}
      </time>
    </td>
  </tr>
);
