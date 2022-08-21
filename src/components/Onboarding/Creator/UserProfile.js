import { useGetSkills, useGetInterests } from 'hooks';
import SocialLinks from 'components/Shared/Form/SocialLinks';
import MultiSelect from 'components/Shared/Form/MultiSelect';

export default function UserProfile({ handleChange, values, setFieldValue }) {
  const { skills } = useGetSkills();
  const { interests } = useGetInterests();

  return (
    <div className='bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6 w-full'>
      <div className='md:grid md:grid-cols-3 md:gap-6'>
        <div className='md:col-span-1'>
          <h3 className='text-lg font-medium leading-6 text-gray-900'>
            Your profile
          </h3>
          <p className='mt-1 text-sm text-gray-500'>Complete your profile</p>
        </div>
        <div className='mt-5 md:mt-0 md:col-span-2'>
          <div className='space-y-6'>
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
            <div className='flex flex-col sm:flex-row gap-5'>
              <MultiSelect
                options={skills}
                label='Select skills'
                selected={values.skillIds}
                onChange={(e) => {
                  setFieldValue('skillIds', e);
                }}
              />
              <MultiSelect
                options={interests}
                label='Select interests'
                selected={values.interestIds}
                onChange={(e) => {
                  setFieldValue('interestIds', e);
                }}
              />
            </div>
            <SocialLinks
              onChange={handleChange}
              values={values}
              name='socialLinks'
            />
          </div>
        </div>
      </div>
    </div>
  );
}
