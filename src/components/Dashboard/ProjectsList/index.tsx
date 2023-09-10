import { Project } from '../Project/Project';

const ProjectList = ({ data, count, fetchMore }) => {
  return (
    <div className='hidden sm:block'>
      <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex flex-col mt-2'>
          <div className='align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg'>
            <table className='min-w-full divide-y divide-gray-200'>
              <thead>
                <tr>
                  <th className='px-6 py-3 bg-ugcblue text-left text-xs font-xl text-white uppercase tracking-wider'>
                    Title
                  </th>
                  <th className='px-6 py-3 bg-ugcblue text-right text-xs font-xl text-white uppercase tracking-wider'>
                    Amount
                  </th>
                  <th className='px-6 py-3 bg-ugcblue text-right text-xs font-xl text-white uppercase tracking-wider'>
                    Status
                  </th>
                  <th className='px-6 py-3 bg-ugcblue text-right text-xs font-xl text-white uppercase tracking-wider'>
                    Applications
                  </th>

                  <th className='px-6 py-3 bg-ugcblue text-right text-xs font-xl text-white uppercase tracking-wider'>
                    Last update
                  </th>
                </tr>
              </thead>
              {/* Table Body */}
              <tbody className='bg-white divide-y divide-gray-200'>
                {data?.map((project) => (
                  <Project project={project} key={project._id} />
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
                  <span className='font-xl'>{count}</span> results
                </p>
              </div>
              <div className='flex-1 flex justify-between sm:justify-end'>
                {data?.length < count ? (
                  <button
                    onClick={fetchMore}
                    className='ml-3 relative inline-flex items-center px-4 py-2 border text-sm font-semibold rounded-md text-white bg-primaryOrange opacity-80 hover:opacity-100'
                  >
                    Show more
                  </button>
                ) : null}
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectList;
