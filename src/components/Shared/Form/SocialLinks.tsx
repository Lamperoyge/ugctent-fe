const SOCIALS = [
  {
    media: 'Instagram',
    key: 'instagram',
    placeholder: '@ugctent',
  },
  {
    media: 'TikTok',
    key: 'tiktok',
    placeholder: '@ugctenttiktok',
  },
  {
    media: 'YouTube',
    key: 'youtube',
    placeholder: '@ugctentyoutube',
  },
  {
    media: 'Facebook',
    key: 'facebook',
    placeholder: '@ugctent',
  },
];

const SocialLinks = ({ onChange, values, name }) => (
    <div className='grid grid-cols-3 gap-6'>
      <div className='col-span-3 sm:col-span-2'>
        <label
          htmlFor='socialLinks'
          className='block text-sm font-medium text-gray-700'
        >
          Social handles or links
        </label>
        {SOCIALS.map((social, idx) => (
          <div className='mt-1 flex rounded-md shadow-sm' key={idx}>
            <span className='inline-flex min-w-1/4 items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm'>
              {social.media}
            </span>
            <input
              type='text'
              name={`${name}.${social.key}`}
              id={`${name}.${social.key}`}
              onChange={onChange}
              value={values[name][social.key]}
              className='focus:ring-secondary focus:border-secondary flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300'
              placeholder={social.placeholder}
            />
          </div>
        ))}
      </div>
    </div>
  );

export default SocialLinks;
