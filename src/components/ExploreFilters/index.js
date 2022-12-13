import { SearchIcon } from '@heroicons/react/solid';

const Search = ({ onChange, label = 'Search' }) => (
  <div className='w-full flex md:ml-0' action='#' method='GET'>
    <label htmlFor='search-field' className='sr-only'>
      {label}
    </label>
    <div className='relative w-full text-gray-400 focus-within:text-secondary border rounded-md px-2 '>
      <div className='pointer-events-none absolute inset-y-0 left-1 flex items-center'>
        <SearchIcon className='h-5 w-5' aria-hidden='true' />
      </div>
      <input
        id='search-field'
        onChange={onChange}
        className='block h-full w-full border-transparent py-2 pl-8 pr-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm'
        placeholder='Search'
        type='search'
        name='search'
      />
    </div>
  </div>
);

const COMPONENT_TO_RENDER = {
  search: Search,
};

const ExploreFilters = ({ config }) => {
  return (
    <div>
      {config?.map(({ component, ...props }, key) => {
        const Component = COMPONENT_TO_RENDER[component];
        return (
          <div key={key}>
            <Component {...props} />
          </div>
        );
      })}
    </div>
  );
};

export default ExploreFilters;
