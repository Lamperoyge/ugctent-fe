import Link from 'next/link'
import StatusChip from 'components/StatusChip';

const ProjectList = ({data}) => {
    return (
      <div className='hidden sm:block'>
          <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='flex flex-col mt-2'>
              <div className='align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg'>
                <table className='min-w-full divide-y divide-gray-200'>
                  <thead>
                    <tr>
                      <th className='px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        Title
                      </th>
                      <th className='px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        Amount
                      </th>
                      <th className='px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        Status
                      </th>
                      <th className='px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        Applications
                      </th>

                      <th className='px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        Last update
                      </th>
                    </tr>
                  </thead>
                  <tbody className='bg-white divide-y divide-gray-200'>
                    {data?.map((project) => (
                      <tr key={project._id} className='bg-white'>
                        <td className='max-w-0 w-full px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                          <div className='flex'>
                            <Link
                              href={`/projects/${project._id}`}
                              className='group inline-flex space-x-2 truncate text-sm'>

                              <p className='text-gray-500 truncate group-hover:text-gray-900'>
                                {project.title}
                              </p>

                            </Link>
                          </div>
                        </td>
                        <td className='px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500'>
                          <span className='text-gray-900 font-medium'>
                            {project.amount}{' '}
                          </span>
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
                    ))}
                  </tbody>
                </table>
                {/* Pagination */}
                <nav
                  className='bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6'
                  aria-label='Pagination'
                >
                  <div className='hidden sm:block'>
                    <p className='text-sm text-gray-700'>
                      Showing <span className='font-medium'>1</span> to{' '}
                      <span className='font-medium'>10</span> of{' '}
                      <span className='font-medium'>20</span> results
                    </p>
                  </div>
                  <div className='flex-1 flex justify-between sm:justify-end'>
                    <a
                      href='#'
                      className='relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50'
                    >
                      Previous
                    </a>
                    <a
                      href='#'
                      className='ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50'
                    >
                      Next
                    </a>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
    );
};

export default ProjectList