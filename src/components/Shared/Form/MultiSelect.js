/* This Multiselect requires Tailwind CSS v2.0+ */
import { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import { classNames } from 'utils/helpers';

export default function Multiselect({
  options,
  label = '',
  onChange = () => {},
  selected,
}) {
  return (
    <Listbox value={selected} onChange={onChange} multiple>
      {({ open }) => (
        <div className='w-full'>
          <Listbox.Label className='block text-sm font-medium text-gray-700'>
            {label}
          </Listbox.Label>
          <div className='mt-1 relative'>
            <Listbox.Button className='flex min-h-10 flex-wrap gap-2 relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm'>
              {selected.length ? (
                selected?.map((s, idx) => (
                    <span
                      className='border rounded-full py-1 px-3 font-semibold text-white bg-primaryOrange items-center'
                      key={idx}
                    >
                      <span className='block truncate'>{s.label}</span>
                    </span>
                  ))
              ) : (
                <span className='border rounded-full py-1 px-3 font-semibold text-slate-700 bg-slate-300	items-center opacity-30'>
                  <span className='block truncate'>Select value</span>
                </span>
              )}
              <span className='ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none'>
                <SelectorIcon
                  className='h-5 w-5 text-gray-400'
                  aria-hidden='true'
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave='transition ease-in duration-100'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <Listbox.Options className='absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm'>
                {options?.map((option) => (
                  <Listbox.Option
                    key={option._id}
                    className={({ active }) =>
                      classNames(
                        active ? 'text-white bg-secondary' : 'text-gray-900',
                        'cursor-default select-none relative py-2 pl-3 pr-9'
                      )
                    }
                    value={option}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className='flex items-center'>
                          {/* <img
                            src={person.avatar}
                            alt=''
                            className='flex-shrink-0 h-6 w-6 rounded-full'
                          /> */}
                          <span
                            className={classNames(
                              selected ? 'font-semibold' : 'font-normal',
                              'ml-3 block truncate'
                            )}
                          >
                            {option.label}
                          </span>
                        </div>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? 'text-white' : 'text-secondary',
                              'absolute inset-y-0 right-0 flex items-center pr-4'
                            )}
                          >
                            <CheckIcon className='h-5 w-5' aria-hidden='true' />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </div>
      )}
    </Listbox>
  );
}
