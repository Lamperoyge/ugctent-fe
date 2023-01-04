/*
  This example requires Tailwind CSS v3.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { Fragment, useCallback, useMemo, useRef, useState } from 'react';
import { Combobox, Dialog, Transition } from '@headlessui/react';
import { SearchIcon } from '@heroicons/react/solid';
import { useLazyQuery } from '@apollo/client';
import { GLOBAL_SEARCH } from 'graphql/queries';

import {
  CalendarIcon,
  CodeIcon,
  DocumentIcon,
  ExclamationCircleIcon,
  LinkIcon,
  PencilAltIcon,
  PhotographIcon,
  TableIcon,
  VideoCameraIcon,
  ViewBoardsIcon,
  ViewListIcon,
  PuzzleIcon,
  HomeIcon,
} from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import { classNames, debounce } from 'utils/helpers';
import ComponentSwitch from './Components';

const CREATOR_DEFAULT_ITEMS = [
  {
    id: 1,
    name: 'Explore opportunities',
    description: 'Discover jobs',
    url: '/explore',
    color: 'bg-indigo-500',
    icon: PencilAltIcon,
  },
  {
    id: 2,
    name: 'Explore talents',
    description: 'Discover talents',
    url: '/explore/talents',
    color: 'bg-blue-500',
    icon: PuzzleIcon,
  },
  {
    id: 3,
    name: 'Dashboard',
    description: 'View your dashboard',
    url: '/dashboard',
    color: 'bg-green-500',
    icon: HomeIcon,
  },
  // More items...
];

export default function Spotlight() {
  const [search, { data, loading, error }] = useLazyQuery(GLOBAL_SEARCH, {
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: true,
  });

  const ref = useRef();
  const handleSearch = debounce(
    (query) =>
      search({
        variables: {
          query,
        },
      }),
    500
  );

  const handleInputChange = (e) => handleSearch(e.target.value);

  const router = useRouter();
  const [open, setOpen] = useState(false);

  const filteredItems = !data ? CREATOR_DEFAULT_ITEMS : CREATOR_DEFAULT_ITEMS;

  const GROUPS_DEFAULT = {
    jobs: {
      label: 'Jobs',
      items: [],
      key: 'jobs',
    },
    creators: {
      label: 'Creators',
      items: [],
      key: 'creators',
    },
    companies: {
      label: 'Companies',
      items: [],
      key: 'companies',
    },
  };

  const itemGroups = useMemo(() => {
    if (data?.search) {
      const obj = Object.keys(data?.search)?.reduce(
        (acc, next) => {
          if (data?.search[next]?.length && acc.hasOwnProperty(next)) {
            acc[next].items = data?.search[next];
          }
          return acc;
        },
        { ...GROUPS_DEFAULT }
      );
      return obj;
    }
    return {};
  }, [data]);

  console.log(open, 'OPEN12')
  return (
    <>
      <div
        className='relative w-full text-gray-400 focus-within:text-gray-600'
        onClick={() => setOpen(true)}
      >
        <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center'>
          <SearchIcon className='h-5 w-5' aria-hidden='true' />
        </div>
        <input
          id='search-field'
          className='block h-full w-full border-transparent py-2 pl-8 pr-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm'
          placeholder='Launch spotlight'
        />
      </div>

      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as='div'
          className='fixed inset-0 z-10 overflow-y-auto p-4 sm:p-6 md:p-20'
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Dialog.Overlay className='fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity' />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 scale-95'
            enterTo='opacity-100 scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 scale-100'
            leaveTo='opacity-0 scale-95'
          >
            <Combobox
              as='div'
              className='mx-auto max-w-xl transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all'
              onChange={(item) => {
                setOpen(false);
                router.push(item.url);
              }}
            >
              <div className='relative'>
                <SearchIcon
                  className='pointer-events-none absolute top-3.5 left-4 h-5 w-5 text-gray-400'
                  aria-hidden='true'
                />
                <Combobox.Input
                  className='h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-800 placeholder-gray-400 focus:ring-0 sm:text-sm'
                  placeholder='Search jobs, talents, and more'
                  ref={ref}
                  onChange={(event) => handleInputChange(event)}
                />
              </div>

              {!ref?.current?.value ? (
                <Combobox.Options
                  static
                  className='max-h-full scroll-py-3 overflow-y-auto p-3'
                >
                  {filteredItems.map((item) => (
                    <Combobox.Option
                      key={item.id}
                      value={item}
                      className={({ active }) =>
                        classNames(
                          'flex cursor-default select-none rounded-xl p-3',
                          active && 'bg-gray-100'
                        )
                      }
                    >
                      {({ active }) => (
                        <>
                          <div
                            className={classNames(
                              'flex h-10 w-10 flex-none items-center justify-center rounded-lg',
                              item.color
                            )}
                          >
                            <item.icon
                              className='h-6 w-6 text-white'
                              aria-hidden='true'
                            />
                          </div>
                          <div className='ml-4 flex-auto'>
                            <p
                              className={classNames(
                                'text-sm font-medium',
                                active ? 'text-gray-900' : 'text-gray-700'
                              )}
                            >
                              {item.name}
                            </p>
                            <p
                              className={classNames(
                                'text-sm',
                                active ? 'text-gray-700' : 'text-gray-500'
                              )}
                            >
                              {item.description}
                            </p>
                          </div>
                        </>
                      )}
                    </Combobox.Option>
                  ))}
                </Combobox.Options>
              ) : null}

              <Combobox.Options
                static
                className='max-h-full scroll-pt-11 scroll-pb-2 space-y-2 overflow-y-auto pb-2'
              >
                {Object.values(itemGroups)?.map((val, idx) => {
                  if (val?.items?.length) {
                    return (
                      <li key={idx}>
                        <h2 className='bg-gray-100 py-2.5 px-4 text-xs font-semibold text-gray-900'>
                          {val?.label}
                        </h2>
                        <ul className='mt-2 text-sm text-gray-800 divide-y'>
                          {val?.items?.map((item, idx) => (
                            <ComponentSwitch
                              item={item}
                              onClick={() => setOpen(false)}
                              key={idx}
                              itemKey={val.key}
                            />
                          ))}
                        </ul>
                      </li>
                    );
                  }
                  return null;
                })}
              </Combobox.Options>
{/* 
              {ref?.current?.value && (
                <div className='py-14 px-6 text-center text-sm sm:px-14'>
                  <ExclamationCircleIcon
                    type='outline'
                    name='exclamation-circle'
                    className='mx-auto h-6 w-6 text-gray-400'
                  />
                  <p className='mt-4 font-semibold text-gray-900'>
                    No results found
                  </p>
                  <p className='mt-2 text-gray-500'>
                    No components found for this search term. Please try again.
                  </p>
                </div>
              ) : null} */}
            </Combobox>
          </Transition.Child>
        </Dialog>
      </Transition.Root>
    </>
  );
}