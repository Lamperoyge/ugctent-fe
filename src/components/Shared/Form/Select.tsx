import { useEffect, useState } from 'react';
import { CheckIcon, SelectorIcon, XIcon } from '@heroicons/react/solid';
import { Combobox } from '@headlessui/react';
import { classNames } from 'utils/helpers';

export default function Select({
  label = '',
  options = [],
  value,
  onChange,
  name,
  inputHeight,
  wrapperStyle = '',
  error = '',
}: any) {
  const [query, setQuery] = useState('');

  const filteredOptions =
    query === ''
      ? options
      : options.filter((option) =>
          option.label.toLowerCase().includes(query.toLowerCase())
        );

  return (
    <Combobox
      as='div'
      name={name}
      value={value}
      onChange={onChange}
      className={wrapperStyle}
    >
      <Combobox.Label className='block text-sm font-medium text-gray-700'>
        {label}
      </Combobox.Label>
      <div className='relative mt-1'>
        <Combobox.Input
          className={`w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm ${inputHeight}`}
          onChange={(event) => setQuery(event.target.value)}
          // poh, this is a bit of a hack, but it works
          displayValue={(option: any) => option?.label || option[0]?.label}
        />
        <Combobox.Button className='absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none'>
          <SelectorIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
        </Combobox.Button>
        <Combobox.Button className='absolute inset-y-0 right-6 flex items-center rounded-r-md px-2 focus:outline-none'>
          <XIcon
            onClick={() => onChange(null)}
            className='h-5 w-5 text-gray-400'
            aria-hidden='true'
          />
        </Combobox.Button>
        {filteredOptions.length > 0 && (
          <Combobox.Options className='absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
            {filteredOptions.map((option, idx) => (
              <Combobox.Option
                key={idx}
                value={option}
                className={({ active }) =>
                  classNames(
                    'relative cursor-default select-none py-2 pl-3 pr-9',
                    active ? 'bg-secondary text-white' : 'text-gray-900'
                  )
                }
              >
                {({ active, selected }) => (
                  <>
                    <span
                      className={classNames(
                        'block truncate',
                        selected && 'font-semibold'
                      )}
                    >
                      {option.label}
                    </span>

                    {selected && (
                      <span
                        className={classNames(
                          'absolute inset-y-0 right-0 flex items-center pr-4',
                          active ? 'text-white' : 'text-secondary'
                        )}
                      >
                        <CheckIcon className='h-5 w-5' aria-hidden='true' />
                      </span>
                    )}
                  </>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
      </div>
      {error ? (
        <p className='mt-2 text-sm text-red-600'>
          {typeof error === 'string' ? error : 'Select a value'}
        </p>
      ) : null}
    </Combobox>
  );
}
