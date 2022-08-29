import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useRef, useState } from 'react';
import ImagePreview from 'components/ImagePreview';
import { useFormik } from 'formik';
import * as yup from 'yup';

const schema = yup.object({
  title: yup.string().required('You need to specify a title').min(3),
  price: yup.number().required('You need to enter a price'),
  categoryId: yup.string().nullable(),
  skillIds: yup.array().of(yup.string()),
  dueDate: yup.string(),
  links: yup.array().of(yup.string()),
  description: yup
    .string()
    .required('You need to enter project description')
    .min(100),
});

const CreateProjectModal = ({ open, onClose }) => {
  const formConfig = [
    {
      name: 'title',
      type: 'text',
      placeholder: 'Project name',
      label: 'Title',
      component: 'input',
    },
    {
      name: 'description',
      component: 'textarea',
      rows: 3,
      placeholder: 'Be as descriptive as you can!',
      label: 'Description',
    },
    {
      name: 'price',
      step: 1,
      placeholder: '150 RON',
      label: 'Price',
      type: 'number',
      component: 'input',
    },
    {
      name: 'dueDate',
      component: 'datepicker',
      label: 'Due Date',
    },
    {
      name: 'categoryId',
      type: 'select',
      label: 'Business Domain',
      placeholder: 'Select business domain',
      default: 'use b categ',
    },
    {
      name: 'skillIds',
      type: 'multipleSelect',
      label: 'Skills',
      placeholder: 'Select skills required to complete this job',
    },
    {
      name: 'links',
      type: 'links',
      label: 'Links',
      placeholder: 'Add link',
    },
  ];

  const initialValues = {
    title: '',
    price: '',
    categoryId: null,
    skillIds: [],
    dueDate: '',
    links: [],
    description: '',
  };

  const formik = useFormik({
    initialValues,
    validationSchema: schema,
    onSubmit: (values) => console.log(values),
  });

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
              <Dialog.Panel className='relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full'>
                <div className='mt-5 md:mt-0 md:col-span-2'>
                  <div>
                    <div className='shadow sm:rounded-md sm:overflow-hidden'>
                      <div className='px-4 py-5 bg-white space-y-6 sm:p-6'>
                        <div className='grid grid-cols-3 gap-6'>
                          <div className='col-span-3 sm:col-span-2'>
                            <div className='flex'>
                              {formConfig?.map((item, idx) => {
                                if (item.component === 'input') {
                                  return (
                                    <>
                                      <label
                                        htmlFor='Bio'
                                        className='block text-sm font-medium text-gray-700'
                                      >
                                        {item.label}
                                      </label>
                                      <input
                                        onChange={formik.handleChange}
                                        name={item.name}
                                        placeholder={item.placeholder}
                                      />
                                    </>
                                  );
                                }
                                return null;
                              })}
                            </div>
                          </div>
                        </div>
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
};

export default CreateProjectModal;
