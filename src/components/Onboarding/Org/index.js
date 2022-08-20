import Stepper from 'components/Shared/Stepper';
import { useState } from 'react';
import CompanyProfile from './CompanyProfile';
import PersonalInformation from './PersonalInformation';
import { useFormik } from 'formik';
import { uploadPhoto } from 'services/upload-media';
import * as yup from 'yup';

const schema = yup.object({
  companyName: yup.string().required('Please enter your company name'),
  bio: yup.string(),
  categoryIds: yup.array().of(
    yup.object({
      _id: yup.string().nullable(),
      label: yup.string(),
      __typename: yup.string(),
    })
  ),
  website: yup.string(),
  socialLinks: yup.object({
    instagram: yup.string(),
    tiktok: yup.string(),
    youtube: yup.string(),
    facebook: yup.string(),
  }),
  taxId: yup.string(),
  firstName: yup.string(),
  lastName: yup.string(),
  city: yup.string(),
  country: yup.string(),
  profilePicture: yup.mixed(),
});

const STEPS = [
  {
    name: 'Company profile',
    id: 'companyProfile',
  },
  {
    name: 'Personal details',
    id: 'personalDetails',
  },
];

export default function OrgOnboardingForm() {
  const [step, setStep] = useState(STEPS[0]);

  const lastCompletedStepIdx = STEPS.findIndex((s) => s.id === step.id) - 1;

  const lastCompletedStep =
    lastCompletedStepIdx >= 0 ? STEPS[lastCompletedStepIdx] : STEPS[0];

  const ActivePartComponent =
    step.id === 'companyProfile' ? CompanyProfile : PersonalInformation;

  const formik = useFormik({
    initialValues: {
      companyName: '',
      bio: '',
      categoryIds: [
        {
          label: 'Select a value',
          _id: null,
        },
      ],
      website: '',
      socialLinks: {
        youtube: '',
        tiktok: '',
        instagram: '',
        facebook: '',
      },
      taxId: '',
      firstName: '',
      lastName: '',
      city: '',
      country: '',
      profilePicture: null,
    },
    onSubmit: (values) => {
      uploadPhoto(values.profilePicture).then((res) => {
        console.log(res);
      });
    },
    validationSchema: schema,
  });

  //TODO refactor

  const moveStepper = (type) => {
    if (type === 'next') {
      return setStep(STEPS[lastCompletedStepIdx + 2]);
    }
    if (type === 'prev') {
      return setStep(STEPS[lastCompletedStepIdx]);
    }
  };

  const submitBtnAction =
    step.id !== STEPS[STEPS.length - 1].id
      ? () => moveStepper('next')
      : formik.handleSubmit;

  console.log(formik);
  return (
    <div className='space-y-6 w-full'>
      <div className='py-5 bg-white shadow px-5 py-5 sm:rounded-lg sm:p-6'>
        <Stepper
          steps={STEPS}
          setStep={setStep}
          currentStep={step.id}
          lastCompleted={lastCompletedStep.id}
        />
      </div>
      <ActivePartComponent
        values={formik.values}
        handleSubmit={formik.handleSubmit}
        handleChange={formik.handleChange}
        setFieldValue={formik.setFieldValue}
      />

      <div className='flex justify-end'>
        <button
          type='button'
          className='bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary'
        >
          Cancel
        </button>
        <button
          type='button'
          onClick={submitBtnAction}
          className='ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primaryOrange hover:bg-transparent hover:border-primaryOrange hover: text-priamryOrange focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary'
        >
          {step.id === STEPS[STEPS.length - 1].id ? 'Submit' : 'Next'}
        </button>
      </div>
    </div>
  );
}
