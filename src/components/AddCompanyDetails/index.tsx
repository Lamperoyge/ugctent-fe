import { useMutation } from '@apollo/client';
import { Modal } from '@mantine/core';
import { UPDATE_USER_INFO } from 'graphql/mutations';
import { useAuth } from 'hooks';
import { useRef } from 'react';

const AddCompanyDetails = ({ onClose }) => {
  const { user = {}, isStripeVerified }: any = useAuth();
  const [updateUser] = useMutation(UPDATE_USER_INFO, {
    refetchQueries: ['getLoggedInUser'],
  });

  const ref = useRef(null);

  const handleUpdate = () => {
    const value = ref.current.value;
    if (!value) return null;
    updateUser({
      variables: {
        input: {
          id: user?._id,
          taxId: value,
        },
      },
    });
  };
  const { userInfo } = user;

  return (
    <Modal opened onClose={onClose} title='Add company details'>
      <div className='w-full py-4'>
        <label
          htmlFor='companyName'
          className='block text-sm font-medium text-gray-700'
        >
          VAT Number - required for invocies
        </label>
        <input
          type='text'
          name='taxId'
          id='taxId'
          ref={ref}
          autoComplete='taxId'
          placeholder='RO1234567'
          className='mt-1 focus:ring-secondary focus:border-secondary block w-1/3 shadow-sm sm:text-sm border-gray-300 rounded-md'
        />
      </div>
      <div className='text-right align-left flex '>
        <button
          type='button'
          onClick={handleUpdate}
          className='bg-secondary border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary'
        >
          Submit
        </button>
      </div>
    </Modal>
  );
};

export default AddCompanyDetails;
