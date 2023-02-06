//@ts-nocheck
//TODO: fix types

import CreateSubmissionButton from './SubmissionsButton';
import { useState } from 'react';
import { LoadingOverlay, Modal } from '@mantine/core';
import { useFormik } from 'formik';
import { useJobSubmissions } from 'hooks';
import * as yup from 'yup';
import { renderSubmissionsComponent, config } from './Submisions.utils';
import { uploadPhoto } from 'services/upload-media';

const validationSchema = yup.object().shape({
  description: yup
    .string()
    .required('Description is required')
    .min(10, 'Description must be at least 10 characters'),
  price: yup.number(),
  attachments: yup.array().of(yup.mixed()).max(5).nullable(),
  links: yup.array().of(
    yup.object().shape({
      displayName: yup.string().required('Display name is required'),
      url: yup.string().required('URL is required'),
    })
  ),
});

const CreateSubmission = ({ jobId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { createJobSubmission } = useJobSubmissions();
  const toggleModal = () => setIsOpen((prevState) => !prevState);

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      attachments: null,
      links: [
        {
          displayName: '',
          url: '',
        },
      ],
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      const getFileStrings = async (attachments) =>
        await Promise.all(
          attachments.map(async (i) => {
            const data = await uploadPhoto(i);
            return data.src;
          })
        );
      const attachments = values.attachments?.length ? await getFileStrings(values.attachments) : [];
      await createJobSubmission({
        variables: {
          input: {
            ...values,
            attachments,

            jobId,
          },
        },
      });
      setSubmitting(false);
      formik.resetForm();
      toggleModal();
    },
  });

  return (
    <>
      <Modal opened={isOpen} size='lg' onClose={toggleModal} title='Submission'>
        <LoadingOverlay visible={formik.isSubmitting} overlayBlur={2} />
        <h2 className='py-4 font-bold'>Create new submission</h2>
        <div className='flex justify-center items-center'>
          <div className='flex flex-col w-full space-y-6 py-4'>
            {config.map((item, idx) =>
              renderSubmissionsComponent(item, formik, idx)
            )}
          </div>
        </div>
        <div className='px-4 py-3 text-right sm:px-6'>
          <button
            type='button'
            onClick={(e) => formik.handleSubmit(e)}
            className='bg-secondary border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary'
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
