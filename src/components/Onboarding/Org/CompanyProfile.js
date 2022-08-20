import Select from 'components/Shared/Form/Select';
import SocialLinks from 'components/Shared/Form/SocialLinks';
import { Formik } from 'formik';
import { useGetCategories } from 'hooks';

export default function CompanyProfile({
  handleChange,
  values,
  handleSubmit,
  setFieldValue,
}) {
  const { categories, categoriesError, categoriesLoading } = useGetCategories();

  return (
    <div className='bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6 w-full'>
      <div className='md:grid md:grid-cols-3 md:gap-6'>
        <div className='md:col-span-1'>
          <h3 className='text-lg font-medium leading-6 text-gray-900'>
            Company profile
          </h3>
          <p className='mt-1 text-sm text-gray-500'>Complete your profile</p>
        </div>
        <div className='mt-5 md:mt-0 md:col-span-2'>
          <form className='space-y-6' action='#' method='POST'>
            <div className='col-span-6 sm:col-span-4'>
              <label
                htmlFor='companyName'
                className='block text-sm font-medium text-gray-700'
              >
                Your company name
              </label>
              <input
                type='text'
                name='companyName'
                id='companyName'
                value={values.companyName}
                onChange={handleChange}
                autoComplete='company'
                placeholder='Ugctent'
                className='mt-1 focus:ring-secondary focus:border-secondary block w-1/3 shadow-sm sm:text-sm border-gray-300 rounded-md'
              />
            </div>
            <div>
              <label
                htmlFor='Bio'
                className='block text-sm font-medium text-gray-700'
              >
                Bio
              </label>
              <div className='mt-1'>
                <textarea
                  id='bio'
                  name='bio'
                  rows={3}
                  value={values.bio}
                  onChange={handleChange}
                  className='shadow-sm focus:ring-secondary focus:border-secondary block w-full sm:text-sm border border-gray-300 rounded-md'
                  placeholder='Tell the world how great you are!'
                />
              </div>
              <p className='mt-2 text-sm text-gray-500'>
                Share what you feel is important
              </p>
            </div>
            <div className='w-1/3'>
              <Select
                label='Activity Category'
                options={categories}
                onChange={(e) => {
                  console.log(e);
                  setFieldValue('categoryIds', [e], true);
                }}
                name='categoryIds'
                value={values.categoryIds}
              />
            </div>
            <div className='grid grid-cols-3 gap-6'>
              <div className='col-span-3 sm:col-span-2'>
                <label
                  htmlFor='website'
                  className='block text-sm font-medium text-gray-700'
                >
                  Website
                </label>
                <div className='mt-1 flex rounded-md shadow-sm'>
                  <span className='inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm'>
                    https://
                  </span>
                  <input
                    type='text'
                    name='website'
                    id='website'
                    onChange={handleChange}
                    value={values.website}
                    className='focus:ring-secondary focus:border-secondary flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300'
                    placeholder='www.example.com'
                  />
                </div>
              </div>
            </div>
            <SocialLinks
              onChange={handleChange}
              values={values}
              name='socialLinks'
            />
            <div className='col-span-6 sm:col-span-4'>
              <label
                htmlFor='companyName'
                className='block text-sm font-medium text-gray-700'
              >
                Tax ID - for invoices
              </label>
              <input
                type='text'
                name='taxId'
                id='taxId'
                onChange={handleChange}
                value={values.taxId}
                autoComplete='taxId'
                placeholder='RO1234567'
                className='mt-1 focus:ring-secondary focus:border-secondary block w-1/3 shadow-sm sm:text-sm border-gray-300 rounded-md'
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
