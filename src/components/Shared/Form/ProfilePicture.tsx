import { useState } from 'react';

const ProfilePicture = ({ setFieldValue, selectedFile }) => {
  const [error, setError] = useState(null);
  const onFileChange = (e) => {
    if (e.target.files[0].size > 2097152) {
      return setError('Max upload size is 2MB');
    }
    if (error) setError(null);
    setFieldValue('profilePicture', e.target.files[0]);
  };
  return (
    <div>
      <label className='block text-sm font-medium text-gray-700'>
        Profile picture
      </label>
      <div className='mt-1 flex items-center space-x-5'>
        <span className='inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100'>
          <svg
            className='h-full w-full text-gray-300'
            fill='currentColor'
            viewBox='0 0 24 24'
          >
            <path d='M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z' />
          </svg>
        </span>
        <label className='bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary'>
          Change
          <input
            accept='image/*'
            onChange={onFileChange}
            className='hidden'
            type='file'
          />
        </label>
      </div>
      {selectedFile ? (
        <span className='text-sm text-gray-900 font-light'>
          {selectedFile?.name}
        </span>
      ) : null}
      {error ? (
        <span className='text-sm text-red-400 font-light'>{error}</span>
      ) : null}
    </div>
  );
};

export default ProfilePicture;
