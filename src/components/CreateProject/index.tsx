import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import Select from 'components/Shared/Form/Select';
import { useFormik } from 'formik';
import { useGetCategories, useGetSkills } from 'hooks';
import MultiSelect from 'components/Shared/Form/MultiSelect';
import { uploadPhoto } from 'services/upload-media';
import { CREATE_JOB, UPDATE_JOB } from 'graphql/mutations';
import { useMutation } from '@apollo/client';
import { limit, schema, initialValues } from './config';
import { Input, TextArea, Attachments } from './helpers';

const CreateProjectModal = ({ open, onClose, existingJob }:any) => {
  const { categories = [] } = useGetCategories();
  const { skills } = useGetSkills();
  const [createJob, { data, error, loading }] = useMutation(CREATE_JOB, {
    refetchQueries: ['getJobsForBusinessUser'],
    onCompleted: () => onClose(),
    onError: () => console.log(error),
  });

  const getInitialValuesFromExistingJob = () => {
    return {
      title: existingJob?.title || '',
      price: existingJob?.price || '',
      categoryId: [existingJob?.category],
      skillIds: existingJob?.skills,
      description: existingJob?.description || '',
      attachments: existingJob?.attachments || [],
    };
  };

  const [updateJob] = useMutation(UPDATE_JOB, {
    refetchQueries: ['getJobById'],
    onCompleted: () => onClose(),
  });

  const submitAction = () => {
    if (existingJob) {
      return ({variables}) => {
        updateJob({
          variables: {
            input: {
              ...variables.input,
              _id: existingJob._id,
            },
          },
        });
      };
    }
    return createJob;
  };
  const formik = useFormik({
    initialValues: existingJob
      ? getInitialValuesFromExistingJob()
      : initialValues,
    validationSchema: schema,
    onSubmit: async (values) => {
      const getFileStrings = async (attachments) =>
        await Promise.all(
          attachments.map(async (i) => {
            if (typeof i !== 'string') {
              const data = await uploadPhoto(i);
              return data.src;
            }
            return i;
          })
        );
      const attachments = values?.attachments?.length ? await getFileStrings(values.attachments): null
      submitAction()({
        variables: {
          input: {
            ...values,
            skillIds: values.skillIds.map((s) => s._id),
            attachments,
            categoryId: values.categoryId[0]?._id || null,
          },
        },
      });
    },
  });


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
      // add rich text
      name: 'description',
      component: 'textarea',
      rows: 6,
      placeholder: 'I want to create TikTok videos for my company',
      label: 'Description',
      description: 'Share as many details as possible',
      minContent: 100,
    },
    {
      name: 'price',
      step: 1,
      placeholder: '300',
      label: 'Price',
      type: 'number',
      component: 'input',
      withCurrency: true,
      disclaimer: `This is the total amount you will pay. The creator will get this amount minus the platform fee (10%) and payment processing fees (2.5%).`
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


  const handleAttachments = (e) => {
    const files = Array.from(e.target.files)
      .map((file:any) => (file.size <= limit ? file : null))
      .filter((i) => i);
    files.length !== e.target.files.length
      ? formik.setFieldError('attachments', 'Max upload size is 2MB')
      : formik.setFieldValue(
          'attachments',
          existingJob ? [...existingJob.attachments, ...files] : files
        );
  };

  const removeAttachment = (attach) => {
    const files = formik.values.attachments.filter((v) => v.name !== attach);
    return formik.setFieldValue('attachments', files);
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as='div' className='relative z-10' onClose={onClose}>
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
                              {existingJob ? 'Edit job' : 'New job'}
                            </h3>
                            <p className='mt-1 text-sm text-gray-500'>
                              Share as many details as you can. This will help
                              out creators deliver best results.
                            </p>
                          </div>

                          <div className='flex justify-center items-center'>
                            <div className='flex flex-col w-full sm:w-3/4 space-y-6'>
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
                                      error={formik.errors[item.name]}
                                      variant='xs'
                                      onChange={formik.handleChange}
                                      disclaimer={item.disclaimer}
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
                                      error={formik.errors[item.name]}
                                      label={item.label}
                                      onChange={formik.handleChange}
                                    />
                                  );
                                }
                                if (item.component === 'select') {
                                  return (
                                    <div
                                      className='col-span-1 sm:max-w-1/2'
                                      key={idx}
                                    >
                                      <Select
                                        label={item.label}
                                        options={item.options}
                                        value={formik.values[item.name]}
                                        error={formik.errors[item.name]}
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
                                    <div className='sm:max-w-1/2' key={idx}>
                                      <MultiSelect
                                        options={item.options}
                                        label={item.label}
                                        error={formik.errors[item.name]}
                                        selected={formik.values[item.name]}
                                        onChange={(e:any) => {
                                          formik.setFieldValue(item.name, e);
                                        }}
                                      />
                                    </div>
                                  );
                                }
                                if (item.component === 'attachments') {
                                  return (
                                    <Attachments
                                      handleAttachments={handleAttachments}
                                      key={idx}
                                      errors={formik.errors}
                                      attachments={formik.values.attachments}
                                      removeAttachment={removeAttachment}
                                    />
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
                            onClick={(...params:any) => formik.handleSubmit(params)}
                            className='bg-secondary border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary'
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
