import CreateSubmissionButton from './button';
import { useState } from 'react';
import { LoadingOverlay, Button, Group, Modal } from '@mantine/core';
import { useFormik } from 'formik';
import { TextArea, Input } from 'components/CreateProject/helpers';
import Links from 'components/CreateProject/Links'
import { useJobSubmissions } from 'hooks';
import * as yup from 'yup';

const validationSchema = yup.object().shape({
  description: yup
    .string()
    .required('Description is required')
    .min(10, 'Description must be at least 10 characters'),
  price: yup.number(),
  links: yup.array().of(yup.object().shape({
    displayName: yup.string().required('Display name is required'),
    url: yup.string().required('URL is required')
  }))
});

const config = [
  {
    name: 'title',
    placeholder: 'Enter submission title',
    label: 'Title',
    type: 'text',
    component: 'input',
  },
  {
    name: 'description',
    component: 'textarea',
    rows: 6,
    placeholder: 'Submission description',
    label: 'Description',
    description: 'Please describe your work',
  },
  {
    name: 'links',
    component: 'links',
    placeholder: 'Submission links',
    label: 'Links',
    description: 'Please provide links to your work',
  }
];

const CreateSubmission = ({jobId}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { createJobSubmission } = useJobSubmissions();
  const toggleModal = () => setIsOpen((prevState) => !prevState);

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      links: [{
        displayName: '',
        url: ''
      }]
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      await createJobSubmission({
        variables: {
          input:  { ...values, jobId }
        }
      });
      setSubmitting(false);
      formik.resetForm()
      toggleModal();
    },
  });

  return (
    <>
      <Modal opened={isOpen} size="lg" onClose={toggleModal} title='Submission'>
        <LoadingOverlay visible={formik.isSubmitting} overlayBlur={2} />
        <h2 className='py-4 font-bold'>Create new submission</h2>
        <div className='flex justify-center items-center'>
        <div className='flex flex-col w-full space-y-6 py-4'>
          {config.map((item, idx) => {
            if (item.component === 'input') {
              return (
                <Input
                  {...item}
                  key={idx}
                  placeholder={item.placeholder}
                  value={formik.values[item.name]}
                  name={item.name}
                  onBlur={formik.handleBlur}
                  label={item.label}
                  error={formik.touched[item.name] && formik.errors[item.name]}
                  variant='xs'
                  onChange={formik.handleChange}
                />
              );
              
            }
            if(item.component === 'links') {
                return <Links onChange={(links) => formik.setFieldValue('links', links)} values={formik.values.links}/>
              }
             else if (item.component === 'textarea') {
              return (
                <TextArea
                  {...item}
                  key={idx}
                  placeholder={item.placeholder}
                  value={formik.values[item.name]}
                  onBlur={formik.handleBlur}
                  name={item.name}
                  error={formik.touched[item.name] && formik.errors[item.name]}
                  label={item.label}
                  onChange={formik.handleChange}
                />
              );
            }
          })}
        </div>
      </div>
      <div className='px-4 py-3 text-right sm:px-6'>
        <button
          type='button'
          onClick={formik.handleSubmit}
          className='bg-secondary border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary'
        >
          Send submission
        </button>
      </div>
      </Modal>

      <CreateSubmissionButton onClick={toggleModal} />
    </>
  );
};

export default CreateSubmission;
