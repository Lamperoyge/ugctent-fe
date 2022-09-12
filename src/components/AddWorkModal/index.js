import { Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import ImagePreview from 'components/ImagePreview';

const limit = 5097152;

export default function AddWork({
  open,
  onClose,
  addWork,
  editWork = initialValues,
  handleEdit,
}) {
  const initialValues = {
    title: editWork?.title || '',
    clientName: editWork?.clientName || '',
    attachments: editWork?.attachments || null,
    description: editWork?.description || '',
  };
  const cancelButtonRef = useRef(null);

  const [form, setForm] = useState(initialValues);

  const [errors, setErrors] = useState({
    title: '',
    clientName: '',
    attachments: '',
    description: '',
  });

  const handleSubmit = () => {
    if (editWork) {
      return handleEdit(form);
    }
    addWork(form);
  };

  const handleAttachments = (e) => {
    const files = Array.from(e.target.files)
      .map((file) => (file.size <= limit ? file : null))
      .filter((i) => i);
    files.length !== e.target.files.length
      ? setErrors({ ...errors, attachments: 'Max upload size is 2MB' })
      : setForm({ ...form, attachments: files });
  };

  const removeAttachment = (attach) => {
    const files = form.attachments.filter((v) => v.name !== attach);
    return setForm({ ...form, attachments: files });
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as='div'
        className='relative z-10'
        initialFocus={cancelButtonRef}
        onClose={onClose}
      >
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
        </Transition.Child>

        <div className='fixed z-10 inset-0 overflow-y-auto'>
          <div className='flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              enterTo='opacity-100 translate-y-0 sm:scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 sm:scale-100'
              leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            >
              <Dialog.Panel className='relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full'>
                <div className='mt-5 md:mt-0 md:col-span-2'>
                  <div>
                    <div className='shadow sm:rounded-md sm:overflow-hidden'>
                      <div className='px-4 py-5 bg-white space-y-6 sm:p-6'>
                        <div className='grid grid-cols-3 gap-6'>
                          <div className='col-span-3 sm:col-span-2'>
                            <label
                              htmlFor='title'
                              className='block text-sm font-medium text-gray-700'
                            >
                              Project title
                            </label>
                            <div className='mt-1 flex rounded-md shadow-sm'>
                              <input
                                type='text'
                                name='title'
                                id='title'
                                value={form.title}
                                onChange={handleChange}
                                className='focus:ring-primary focus:border-primary flex-1 block w-full rounded sm:text-sm border-gray-300'
                                placeholder='Product showcase'
                              />
                            </div>
                          </div>
                        </div>
                        <div className='grid grid-cols-3 gap-6'>
                          <div className='col-span-3 sm:col-span-2'>
                            <label
                              htmlFor="clientName"
                              className='block text-sm font-medium text-gray-700'
                            >
                              Client name
                            </label>
                            <div className='mt-1 flex rounded-md shadow-sm'>
                              <input
                                type='text'
                                name='clientName'
                                id='clientName'
                                onChange={handleChange}
                                value={form.clientName}
                                className='focus:ring-primary focus:border-primary flex-1 block w-full rounded sm:text-sm border-gray-300'
                                placeholder='www.example.com'
                              />
                            </div>
                          </div>
                        </div>

                        <div>
                          <label
                            htmlFor='description'
                            className='block text-sm font-medium text-gray-700'
                          >
                            Description
                          </label>
                          <div className='mt-1'>
                            <textarea
                              id='description'
                              name='description'
                              rows={3}
                              value={form.description}
                              onChange={handleChange}
                              className='shadow-sm focus:ring-primary focus:border-primary mt-1 block w-full sm:text-sm border border-gray-300 rounded-md'
                              placeholder='you@example.com'
                            />
                          </div>
                          <p className='mt-2 text-sm text-gray-500'>
                            Brief description of the work you did
                          </p>
                        </div>
                        {form.attachments
                          ? form.attachments.map((attach, idx) => (
                              <div key={idx}>
                                <ImagePreview
                                  className='w-auto max-h-24 rounded overflow-hidden'
                                  file={attach}
                                />
                                <span className='inline-flex rounded-full items-center my-2 py-0.5 pl-2.5 pr-1 text-sm font-medium bg-indigo-100 text-indigo-700'>
                                  {attach.name}
                                  <button
                                    type='button'
                                    onClick={() =>
                                      removeAttachment(attach.name)
                                    }
                                    className='flex-shrink-0 ml-0.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-indigo-400 hover:bg-indigo-200 hover:text-primary focus:outline-none focus:bg-primary focus:text-white'
                                  >
                                    <span className='sr-only'>
                                      Remove large option
                                    </span>
                                    <svg
                                      className='h-2 w-2'
                                      stroke='currentColor'
                                      fill='none'
                                      viewBox='0 0 8 8'
                                    >
                                      <path
                                        strokeLinecap='round'
                                        strokeWidth='1.5'
                                        d='M1 1l6 6m0-6L1 7'
                                      />
                                    </svg>
                                  </button>
                                </span>
                              </div>
                            ))
                          : null}
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
                              <div className='flex text-sm text-gray-600'>
                                <label
                                  htmlFor='attachments'
                                  className='relative cursor-pointer bg-white rounded-md font-medium text-secondary hover:text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary'
                                >
                                  <span>Upload up to 3 files</span>
                                  <input
                                    id='attachments'
                                    multiple
                                    name='attachments'
                                    onChange={handleAttachments}
                                    type='file'
                                    className='sr-only'
                                  />
                                </label>
                              </div>
                              <p className='text-xs text-gray-500'>
                                PNG, JPG, GIF up to 5MB
                              </p>
                            </div>
                          </div>
                          {errors.attachments ? (
                            <span className='text-red-400'>
                              {errors?.attachments}
                            </span>
                          ) : null}
                        </div>
                      </div>
                      <div className='px-4 py-3 bg-gray-50 text-right sm:px-6'>
                        <button
                          type='button'
                          onClick={handleSubmit}
                          className='inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-secondary hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary'
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
