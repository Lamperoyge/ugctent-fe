import { useEffect } from 'react';
import { useAuth, useJobApplications } from 'hooks';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { LoadingOverlay, Modal } from '@mantine/core';
import { TextArea, Input } from 'components/CreateProject/helpers';

const validationSchema = yup.object().shape({
  message: yup
    .string()
    .required('Message is required')
    .min(100, 'Message must be at least 100 characters'),
  price: yup.number(),
});

const config = [
  {
    name: 'message',
    component: 'textarea',
    rows: 6,
    placeholder: 'I am interested in your project',
    label: 'Description',
    description: 'Please describe your interest in this project',
    minContent: 100,
  },
  {
    name: 'price',
    step: 1,
    placeholder: '150',
    label: 'Offered Price',
    type: 'number',
    component: 'input',
    withCurrency: true,
  },
];

const CreateJobApplication = ({ opened, onClose, job }) => {
  const initialValues = {
    message: '',
    price: job.price,
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      await createJobApplication({
        variables: {
          input:  { ...values, jobId: job._id }
        }
      });
      setSubmitting(false);
      onClose();
    },
  });

  useEffect(() => {
    if (opened) {
      formik.resetForm();
    }
    if (job?._id && !formik?.values?.price) {
      formik.setFieldValue('price', job.price);
    }
  }, [opened, job?._id]);

  console.log(formik);
  const { user } = useAuth();
  const { createJobApplication } = useJobApplications();
  return (
    <Modal opened={opened} onClose={onClose} title='Apply'>
      <LoadingOverlay visible={formik.isSubmitting} overlayBlur={2} />
      <h2 className='py-4 font-bold'>Title: {job.title}</h2>
      <span className='py-4 text-xs'>Description: {job.description}</span>
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
            } else if (item.component === 'textarea') {
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
          className='bg-secondary border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary'
        >
          Send application
        </button>
      </div>
    </Modal>
  );
};

export default CreateJobApplication;
