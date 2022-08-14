import ProfilePicture from 'components/Shared/Form/ProfilePicture';
import countries from 'utils/helpers/countries.json';

export default function PersonalInformation({ values, handleChange }) {
  console.log(countries);
  return (
    <div className='bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6'>
      <div className='md:grid md:grid-cols-3 md:gap-6'>
        <div className='md:col-span-1'>
          <h3 className='text-lg font-medium leading-6 text-gray-900'>
            Personal Information
          </h3>
          <p className='mt-1 text-sm text-gray-500'></p>
        </div>
        <div className='mt-5 md:mt-0 md:col-span-2'>
          <form action='#' method='POST' className='flex flex-col gap-6'>
            <ProfilePicture onChange={() => {}} />
            <div className='grid grid-cols-6 gap-6'>
              <div className='col-span-6 sm:col-span-3'>
                <label
                  htmlFor='firstName'
                  className='block text-sm font-medium text-gray-700'
                >
                  First name
                </label>
                <input
                  type='text'
                  name='firstName'
                  value={values.firstName}
                  onChange={handleChange}
                  id='firstName'
                  autoComplete='given-name'
                  className='mt-1 focus:ring-secondary focus:border-secondary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                />
              </div>

              <div className='col-span-6 sm:col-span-3'>
                <label
                  htmlFor='lastName'
                  className='block text-sm font-medium text-gray-700'
                >
                  Last name
                </label>
                <input
                  type='text'
                  name='lastName'
                  value={values.lastName}
                  onChange={handleChange}
                  id='lastName'
                  autoComplete='family-name'
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
                  value={values.country}
                  autoComplete='country-name'
                  className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-secondary focus:border-secondary sm:text-sm'
                >
                  {countries.map((country, idx) => (
                    <option key={idx}>{country.name}</option>
                  ))}
                </select>
              </div>

              <div className='col-span-6 sm:col-span-3'>
                <label
                  htmlFor='city'
                  className='block text-sm font-medium text-gray-700'
                >
                  City
                </label>
                <select
                  id='city'
                  name='city'
                  autoComplete='country-name'
                  className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-secondary focus:border-secondary sm:text-sm'
                >
                  <option>United States</option>
                  <option>Canada</option>
                  <option>Mexico</option>
                </select>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
