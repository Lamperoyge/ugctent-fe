import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useRef, useState } from 'react';
import ImagePreview from 'components/ImagePreview';
import Select from 'components/Shared/Form/Select';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useGetCategories, useGetSkills } from 'hooks';
import MultiSelect from 'components/Shared/Form/MultiSelect';
import { uploadPhoto } from 'services/upload-media';

const limit = 2097152;

const schema = yup.object({
  title: yup.string().required('You need to specify a title').min(3),
  price: yup.number().required('You need to enter a price'),

  categoryId: yup
    .array()
    .of(
      yup.object({
        _id: yup.string(),
        label: yup.string(),
        __typename: yup.string(),
      })
    )
    .required(),
  skillIds: yup
    .array()
    .of(
      yup.object({
        _id: yup.string(),
        label: yup.string(),
        __typename: yup.string(),
      })
    )
    .required(),
  links: yup.array().of(yup.string()),
  attachments: yup.array().of(yup.mixed()).max(3),
  description: yup
    .string()
    .required('You need to enter project description')
    .min(100),
});

const Input = ({
  value,
  placeholder,
  label,
  name,
  variant = 'md',
  onChange,
  ...rest
}) => {
  const variantClass = {
    xs: 'max-w-1/2',
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
          <div class='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
            <span class='text-gray-500 sm:text-sm'>RON</span>
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
          className={`focus:ring-indigo-500 focus:border-indigo-500 flex-grow block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300 ${
            rest.withCurrency ? 'pl-12' : ''
          }`}
        />
      </div>
    </div>
  );
};

const TextArea = ({
  label,
  rows = 3,
  name,
  placeholder,
  value,
  description,
  onChange,
}) => (
  <div className='col-span-3'>
    <label htmlFor={name} className='block text-sm font-medium text-gray-700'>
      {label}
    </label>
    <div className='mt-1'>
      <textarea
        id={name}
        name={name}
        rows={rows}
        className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md'
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
    <p className='mt-2 text-sm text-gray-500'>{description}</p>
  </div>
);

const CreateProjectModal = ({ open, onClose }) => {
  const { categories } = useGetCategories();
  const { skills } = useGetSkills();
  const formConfig = [
    {
      name: 'title',
      type: 'text',
      placeholder: 'Project name',
      label: 'Title',
      component: 'input',
    },
    {
      name: 'categoryId',
      component: 'select',
      label: 'Business Domain',
      placeholder: 'Select business domain',
      options: categories,
    },
    {
      name: 'skillIds',
      component: 'multipleSelect',
      label: 'Skills',
      placeholder: 'Select skills required to complete this job',
      options: skills,
    },
    {
      //add rich text
      name: 'description',
      component: 'textarea',
      rows: 6,
      placeholder: 'I want to create TikTok videos for my company',
      label: 'Description',
      description: 'Share as many details as possible',
    },
    {
      name: 'price',
      step: 1,
      placeholder: '150',
      label: 'Price',
      type: 'number',
      component: 'input',
      withCurrency: true,
    },
    {
      name: 'links',
      component: 'links',
      label: 'Links',
      placeholder: 'Add link',
    },
    {
      name: 'attachments',
      component: 'attachments',
      label: 'Attachments',
    },
  ];

  const initialValues = {
    title: '',
    price: '',
    categoryId: [
      {
        label: 'Select a value',
        _id: null,
      },
    ],
    skillIds: [],
    description: '',
    attachments: [],
  };

  const formik = useFormik({
    initialValues,
    validationSchema: schema,
    onSubmit: async (values) => {
      let getFileStrings = async (attachments) =>
        await Promise.all(
          attachments.map(async (i) => {
            const data = await uploadPhoto(i);
            return data.src;
          })
        );
      let attachments = await getFileStrings(values.attachments);
      console.log(attachments, 'attachments');
      // let works = await Promise.all(
      //   values?.works?.map(async (el, idx) => {
      //     return {
      //       ...el,
      //       attachments: el.attachments
      //         ? await getFileStrings(el.attachments)
      //         : [],
      //     };
      //   })
      // );
      // createUserInfo({
      //   variables: {
      //     input: {
      //       ...values,
      //       profilePicture: profilePic?.src,
      //       interestIds: values.interestIds.map((c) => c._id),
      //       skillIds: values.skillIds.map((s) => s._id),
      //       works,
      //     },
      //   },
      // });
    },
  });

  const handleAttachments = (e) => {
    const files = Array.from(e.target.files)
      .map((file) => (file.size <= limit ? file : null))
      .filter((i) => i);
    files.length !== e.target.files.length
      ? formik.setFieldError('attachments', 'Max upload size is 2MB')
      : formik.setFieldValue('attachments', files);
  };

  console.log(formik);
  const removeAttachment = (attach) => {
    const files = formik.values.attachments.filter((v) => v.name !== attach);
    // return setForm({ ...form, attachments: files });
    return formik.setFieldValue('attachments', files);
  };

  return (
    <Transition.Root show={open} as={Fragment} onClose={onClose}>
      <Dialog as='div' className='relative z-10'>
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
              <Dialog.Panel className='relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-6xl sm:w-full'>
                <div className='w-full'>
                  <div className='space-y-6 sm:px-6 lg:px-0 lg:col-span-9'>
                    <form action='#' method='POST'>
                      <div className='shadow sm:rounded-md sm:overflow-hidden'>
                        <div className='bg-white py-6 px-4 space-y-6 sm:p-6'>
                          <div>
                            <h3 className='text-lg leading-6 font-medium text-gray-900'>
                              New project
                            </h3>
                            <p className='mt-1 text-sm text-gray-500'>
                              Share as many details as you can. This will help
                              out creators deliver best results.
                            </p>
                          </div>

                          <div className='flex justify-center items-center'>
                            <div className='flex flex-col w-3/4 space-y-6'>
                              {formConfig.map((item, idx) => {
                                if (item.component === 'input') {
                                  return (
                                    <Input
                                      {...item}
                                      key={idx}
                                      placeholder={item.placeholder}
                                      value={formik.values[item.name]}
                                      name={item.name}
                                      label={item.label}
                                      variant='xs'
                                      onChange={formik.handleChange}
                                    />
                                  );
                                }
                                if (item.component === 'textarea') {
                                  return (
                                    <TextArea
                                      {...item}
                                      key={idx}
                                      placeholder={item.placeholder}
                                      value={formik.values[item.name]}
                                      name={item.name}
                                      label={item.label}
                                      onChange={formik.handleChange}
                                    />
                                  );
                                }
                                if (item.component === 'select') {
                                  return (
                                    <div className='col-span-1 max-w-1/2'>
                                      <Select
                                        label={item.label}
                                        options={item.options}
                                        value={formik.values[item.name]}
                                        onChange={(e) => {
                                          formik.setFieldValue(
                                            item.name,
                                            [e],
                                            true
                                          );
                                        }}
                                        name={item.name}
                                      />
                                    </div>
                                  );
                                }
                                if (item.component === 'multipleSelect') {
                                  return (
                                    <div className='max-w-1/2'>
                                      <MultiSelect
                                        options={item.options}
                                        label={item.label}
                                        selected={formik.values[item.name]}
                                        onChange={(e) => {
                                          formik.setFieldValue(item.name, e);
                                        }}
                                      />
                                    </div>
                                  );
                                }
                                if (item.component === 'attachments') {
                                  return (
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
                                              className='relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500'
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
                                      {formik.errors.attachments ? (
                                        <span className='text-red-400'>
                                          {formik.errors?.attachments}
                                        </span>
                                      ) : null}
                                      <div className='py-4'>
                                        {formik.values.attachments
                                          ? formik.values.attachments.map(
                                              (attach, idx) => (
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
                                                        removeAttachment(
                                                          attach.name
                                                        )
                                                      }
                                                      className='flex-shrink-0 ml-0.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-indigo-400 hover:bg-indigo-200 hover:text-indigo-500 focus:outline-none focus:bg-indigo-500 focus:text-white'
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
                                              )
                                            )
                                          : null}
                                      </div>
                                    </div>
                                  );
                                }
                                return null;
                              })}
                            </div>
                          </div>
                        </div>
                        <div className='px-4 py-3 bg-gray-50 text-right sm:px-6'>
                          <button
                            type='button'
                            onClick={formik.handleSubmit}
                            className='bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default CreateProjectModal;
