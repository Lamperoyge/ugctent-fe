/* This example requires Tailwind CSS v2.0+ */

import { useState } from 'react';
import { USER_TYPES } from 'utils/constants';
import { BeakerIcon, VideoCameraIcon } from '@heroicons/react/outline';
const options = [
  {
    key: USER_TYPES.CREATOR,
    label: 'I am a creator',
    icon: VideoCameraIcon,
  },
  {
    key: USER_TYPES.ORG,
    label: 'I am a business',
    icon: BeakerIcon,
  },
];

const BUTTONS_MAP = {
  [USER_TYPES.CREATOR]: 'Continue as a creator',
  [USER_TYPES.ORG]: 'Continue as a business',
};
export default function UserTypeSelector({ setUserType }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const handleContinue = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setUserType(selectedOption);
  };
  return (
    <div>
      <dl className='mt-5 flex gap-4 flex-col'>
        {options.map((option, idx) => (
          <button
            key={idx}
            type='button'
            onClick={() => setSelectedOption(option.key)}
            className={`relative w-full bg-white px-4 py-5 border sm:pt-6 sm:px-6 hover:border-secondary cursor-pointer rounded-lg overflow-hidden flex justify-between items-center ${
              selectedOption === option.key ? 'border-secondary' : ''
            }`}
          >
            <p className='text-xl font-semibold text-gray-900'>
              {option.label}
            </p>
            <option.icon className='h-8 w-8 text-primaryOrange' />
          </button>
        ))}
      </dl>
      {selectedOption ? (
        <button
          type='button'
          onClick={handleContinue}
          className='w-full flex justify-center mt-5 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-secondary hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary'
        >
          {BUTTONS_MAP[selectedOption]}
        </button>
      ) : null}
    </div>
  );
}
