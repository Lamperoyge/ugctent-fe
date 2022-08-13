import ProfilePicture from 'components/Shared/Form/ProfilePicture';

export default function PersonalInformation() {
  return (
    <div className='bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6'>
      <div className='md:grid md:grid-cols-3 md:gap-6'>
        <div className='md:col-span-1'>
          <h3 className='text-lg font-medium leading-6 text-gray-900'>
            Personal Information
          </h3>
          <p className='mt-1 text-sm text-gray-500'>
            Use a permanent address where you can receive mail.
          </p>
        </div>
        <div className='mt-5 md:mt-0 md:col-span-2'>
          <form action='#' method='POST' className='flex flex-col gap-6'>
            <ProfilePicture onChange={() => {}} />
            <div className='grid grid-cols-6 gap-6'>
              <div className='col-span-6 sm:col-span-3'>
                <label
                  htmlFor='first-name'
                  className='block text-sm font-medium text-gray-700'
                >
                  First name
                </label>
                <input
                  type='text'
                  name='first-name'
                  id='first-name'
                  autoComplete='given-name'
                  className='mt-1 focus:ring-secondary focus:border-secondary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                />
              </div>

              <div className='col-span-6 sm:col-span-3'>
                <label
                  htmlFor='last-name'
                  className='block text-sm font-medium text-gray-700'
                >
                  Last name
                </label>
                <input
                  type='text'
                  name='last-name'
                  id='last-name'
                  autoComplete='family-name'
                  className='mt-1 focus:ring-secondary focus:border-secondary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                />
              </div>

              <div className='col-span-6 sm:col-span-4'>
                <label
                  htmlFor='email-address'
                  className='block text-sm font-medium text-gray-700'
                >
                  Email address
                </label>
                <input
                  type='text'
                  name='email-address'
                  id='email-address'
                  autoComplete='email'
                  className='mt-1 focus:ring-secondary focus:border-secondary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                />
              </div>

              <div className='col-span-6 sm:col-span-3'>
                <label
                  htmlFor='country'
                  className='block text-sm font-medium text-gray-700'
                >
                  Country
                </label>
                <select
                  id='country'
                  name='country'
                  autoComplete='country-name'
                  className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-secondary focus:border-secondary sm:text-sm'
                >
                  <option>United States</option>
                  <option>Canada</option>
                  <option>Mexico</option>
                </select>
              </div>

              <div className='col-span-6'>
                <label
                  htmlFor='street-address'
                  className='block text-sm font-medium text-gray-700'
                >
                  Street address
                </label>
                <input
                  type='text'
                  name='street-address'
                  id='street-address'
                  autoComplete='street-address'
                  className='mt-1 focus:ring-secondary focus:border-secondary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                />
              </div>

              <div className='col-span-6 sm:col-span-6 lg:col-span-2'>
                <label
                  htmlFor='city'
                  className='block text-sm font-medium text-gray-700'
                >
                  City
                </label>
                <input
                  type='text'
                  name='city'
                  id='city'
                  autoComplete='address-level2'
                  className='mt-1 focus:ring-secondary focus:border-secondary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                />
              </div>

              <div className='col-span-6 sm:col-span-3 lg:col-span-2'>
                <label
                  htmlFor='region'
                  className='block text-sm font-medium text-gray-700'
                >
                  State / Province
                </label>
                <input
                  type='text'
                  name='region'
                  id='region'
                  autoComplete='address-level1'
                  className='mt-1 focus:ring-secondary focus:border-secondary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                />
              </div>

              <div className='col-span-6 sm:col-span-3 lg:col-span-2'>
                <label
                  htmlFor='postal-code'
                  className='block text-sm font-medium text-gray-700'
                >
                  ZIP / Postal code
                </label>
                <input
                  type='text'
                  name='postal-code'
                  id='postal-code'
                  autoComplete='postal-code'
                  className='mt-1 focus:ring-secondary focus:border-secondary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
