import ImagePreview from 'components/ImagePreview';
import ViewAttachments from 'components/ViewAttachments';

export const Input = ({
  value,
  placeholder,
  label,
  name,
  variant = 'md',
  onChange,
  error,
  disclaimer,
  ...rest
}:any) => {
  const variantClass = {
    xs: 'max-w-full sm:max-w-1/2',
    md: 'col-span-3 sm:col-span-1',
  };
  return (
    <div className={variantClass[variant]}>
      <label
        htmlFor='company-website'
        className='block text-sm font-medium text-gray-700'
      >
        {label}
      </label>
      <div className='mt-1 rounded-md shadow-sm flex relative'>
        {rest.withCurrency && (
          <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
            <span className='text-gray-500 sm:text-sm'>RON</span>
          </div>
        )}
        <input
          {...rest}
          name={name}
          id={name}
          onChange={onChange}
          value={value}
          placeholder={placeholder}
          autoComplete={name}
          className={`focus:ring-primary focus:border-primary flex-grow block w-full min-w-0 rounded-md sm:text-sm border-gray-300 ${
            rest.withCurrency ? 'pl-12' : ''
          }`}
        />
      </div>
      {error ? <span className='mt-4 text-red-400'>{error}</span> : null}
      {disclaimer ? <span className='mt-4 text-xs text-gray-400'>{disclaimer}</span> : null}

    </div>
  );
};

export const TextArea = ({
  label,
  rows = 3,
  name,
  placeholder,
  value,
  description,
  onChange,
  error,
  minContent,
  onBlur
}:any) => (
  <div className='col-span-3'>
    <label htmlFor={name} className='block text-sm font-medium text-gray-700'>
      {label}
    </label>
    <div className='mt-1'>
      <textarea
        id={name}
        name={name}
        rows={rows}
        onBlur={onBlur}
        className='shadow-sm focus:ring-primary focus:border-primary mt-1 block w-full sm:text-sm border border-gray-300 rounded-md'
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
    {!!minContent && (
      <div>
        <span className='text-sm text-slate-600'>
          {value?.length} / {minContent}
        </span>
      </div>
    )}
    {error ? <span className='mt-5 text-red-400'>{error}</span> : null}
    <p className='mt-2 text-sm text-gray-500'>{description}</p>
  </div>
);

export const Attachments = ({
  handleAttachments,
  errors,
  attachments,
  removeAttachment,
  limit = 5000000,
  accept="audio/*,video/*,image/*",
  acceptTitle = null
}) => (
  <div>
    <label className='block text-sm font-medium text-gray-700'>
      Attachments
    </label>
    <div className='mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md'>
      <div className='space-y-1 text-center'>
        <svg
          className='mx-auto h-12 w-12 text-gray-400'
          stroke='currentColor'
          fill='none'
          viewBox='0 0 48 48'
          aria-hidden='true'
        >
          <path
            d='M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02'
            strokeWidth={2}
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
        <div className='flex text-sm text-gray-600 justify-center items-center'>
          <label
            htmlFor='attachments'
            className='relative cursor-pointer bg-white rounded-md font-medium text-secondary hover:text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary'
          >
            <span>Upload up to 3 files</span>
            <input
              id='attachments'
              accept={accept} 
              multiple
              name='attachments'
              onChange={handleAttachments}
              type='file'
              className='sr-only'
            />
          </label>
        </div>
        <p className='text-xs text-gray-500'>{acceptTitle || `PNG, JPG, GIF, MP4 up to ${limit / 1000000}MB`}</p>
      </div>
    </div>
    {errors.attachments ? (
      <span className='text-red-400'>{errors?.attachments}</span>
    ) : null}
    <div className='py-4'>
      {attachments ? (
        <ViewAttachments
          attachments={attachments}
          withRemoveButton
          fromMemory
          removeAttachment={removeAttachment}
        />
      ) : null}
    </div>
  </div>
);
