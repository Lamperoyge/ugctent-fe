const SpanHalfWidth = ({label, value}) =>           <div className='sm:col-span-1'>
<dt className='text-sm font-medium text-gray-500'>
  {label}
</dt>
<dd className='mt-1 text-sm text-gray-900'>
  {value}
</dd>
</div>

const SpanFullWidth = ({label, value}) =>           <div className='sm:col-span-2'>
<dt className='text-sm font-medium text-gray-500'>
  {label}
</dt>
<dd className='mt-1 text-sm text-gray-900'>
  {value}
</dd>
</div>

const COMPONENT_TYPE = {
    'half': SpanHalfWidth,
    'full': SpanFullWidth
};
const ApplicationDataViewPanel = ({
  application,
  header,
  subHeader,
  fields
}) => {



  return (
    <section aria-labelledby='applicant-information-title'>
    <div className='bg-white shadow sm:rounded-lg'>
      <div className='px-4 py-5 sm:px-6'>
        <h2
          id='applicant-information-title'
          className='text-lg leading-6 font-medium text-gray-900'
        >
          {header}
        </h2>
        <p className='mt-1 max-w-2xl text-sm text-gray-500'>
          {subHeader}
        </p>
      </div>
      <div className='border-t border-gray-200 px-4 py-5 sm:px-6'>
        <dl className='grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2'>
            {fields.map((field, index)=> {
                const Component = COMPONENT_TYPE[field.type];
                return <Component key={index} {...field}/>
            })}
          {/* <div className='sm:col-span-2'>
            <dt className='text-sm font-medium text-gray-500'>
              Attachments
            </dt>
            <dd className='mt-1 text-sm text-gray-900'>
              <ul
                role='list'
                className='border border-gray-200 rounded-md divide-y divide-gray-200'
              >
                {attachments?.map((attachment) => (
                  <li
                    key={attachment.name}
                    className='pl-3 pr-4 py-3 flex items-center justify-between text-sm'
                  >
                    <div className='w-0 flex-1 flex items-center'>
                      <PaperClipIcon
                        className='flex-shrink-0 h-5 w-5 text-gray-400'
                        aria-hidden='true'
                      />
                      <span className='ml-2 flex-1 w-0 truncate'>
                        {attachment.name}
                      </span>
                    </div>
                    <div className='ml-4 flex-shrink-0'>
                      <a
                        href={attachment.href}
                        className='font-medium text-blue-600 hover:text-blue-500'
                      >
                        Download
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
            </dd>
          </div> */}
        </dl>
      </div>
    </div>
  </section>

  )
};

export default ApplicationDataViewPanel;
