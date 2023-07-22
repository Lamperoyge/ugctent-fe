//@ts-nocheck
//TODO: fix types

import ProfilePicture from 'components/Shared/Form/ProfilePicture';
import countries from 'utils/helpers/countries.json';
import Places from 'components/Places';

export default function PersonalInformation({
  values,
  handleChange,
  setFieldValue,
  errors
}) {
  console.log(errors, 'errors')
  const addressHandleChange = (address) => {
    const country = address?.address_components?.find((i) =>
      i.types.includes('country')
    ).short_name;
    const city = address?.address_components?.find((i) =>
      i.types.includes('locality')
    ).long_name;
    if (country) {
      setFieldValue('country', country, true);
    }
    if (city) {
      setFieldValue('city', city, true);
    }
  };

  return (
    <div className='bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6'>
      <div className='md:grid md:grid-cols-3 md:gap-6'>
        <div className='md:col-span-1'>
          <h3 className='text-lg font-medium leading-6 text-gray-900'>
            Personal Information
          </h3>
          <p className='mt-1 text-sm text-gray-500' />
        </div>
        <div className='mt-5 md:mt-0 md:col-span-2'>
          <form action='#' method='POST' className='flex flex-col gap-6'>
            <ProfilePicture
              setFieldValue={setFieldValue}
              selectedFile={values.profilePicture}
            />
            <div className='grid grid-cols-6 gap-6'>
              <div className='col-span-6 sm:col-span-3'>
                <label
                  htmlFor='firstName'
                  className='block text-sm font-medium text-gray-700'
                >
                  First name
                </label>
                <div>
                <input
                  type='text'
                  name='firstName'
                  value={values.firstName}
                  onChange={handleChange}
                  id='firstName'
                  autoComplete='given-name'
                  className='mt-1 focus:ring-secondary focus:border-secondary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                />
                {errors?.firstName ?  <span className='text-red-400 text-xs'>
                              {errors?.firstName}
                            </span> : null}
                </div>
              </div>

              <div className='col-span-6 sm:col-span-3'>
                <label
                  htmlFor='lastName'
                  className='block text-sm font-medium text-gray-700'
                >
                  Last name
                </label>
                <div>
                <input
                  type='text'
                  name='lastName'
                  value={values.lastName}
                  onChange={handleChange}
                  id='lastName'
                  autoComplete='family-name'
                  className='mt-1 focus:ring-secondary focus:border-secondary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                />
                {errors?.lastName ?  <span className='text-red-400 text-xs'>
                              {errors?.lastName}
                            </span> : null}
                </div>
              </div>

              <div className='col-span-6 sm:col-span-3'>
                <label
                  htmlFor='country'
                  className='block text-sm font-medium text-gray-700'
                >
                  Country
                </label>
                <div>
                <select
                  id='country'
                  name='country'
                  onChange={handleChange}
                  value={values.country}
                  autoComplete='country-name'
                  className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-secondary focus:border-secondary sm:text-sm'
                >
                  <option disabled selected>
                    {' '}
                    Select country{' '}
                  </option>
                  {countries.map((country, idx) => (
                    <option value={country.shortCode} key={idx}>
                      {country.name}
                    </option>
                  ))}
                </select>                {errors?.country ?  <span className='text-red-400 text-xs'>
                              {errors?.country}
                            </span> : null}

                </div>
              </div>
              <div className='col-span-6 sm:col-span-3'>
                <Places
                  htmlFor='city'
                  label='City'
                  name='city'
                  value={values.city}
                  disabled={!values.country}
                  country={values.country}
                  handleChange={addressHandleChange}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
