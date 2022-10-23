import { useState } from 'react';

import PersonalInformation from 'components/Onboarding/Org/PersonalInformation';
import { useFormik } from 'formik';
import { uploadPhoto } from 'services/upload-media';
import { CREATE_USER_INFO } from 'graphql/mutations';
import { useMutation } from '@apollo/client';
import * as yup from 'yup';
import { LightSpinner } from 'components/Shared/Spinner';
import Stepper from 'components/Shared/Stepper';
import { useAuth } from 'hooks';
import { useRouter } from 'next/router';
import UserProfile from './UserProfile';
import Portfolio from './Portfolio';

const schema = yup.object({
  // personal
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  city: yup.string(),
  country: yup.string(),
  profilePicture: yup.mixed(),
  // profile
  bio: yup.string(),
  interestIds: yup
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
        _id: yup.string().required(),
        label: yup.string().required(),
        __typename: yup.string(),
      })
    )
    .required(),

  socialLinks: yup.object({
    instagram: yup.string(),
    tiktok: yup.string(),
    youtube: yup.string(),
    facebook: yup.string(),
  }),
  website: yup.string(),

  // portfolio
  works: yup.array().of(
    yup.object({
      title: yup.string(),
      clientName: yup.string(),
      attachments: yup.array().of(yup.mixed()).max(3),
      description: yup.string(),
    })
  ),
});

const STEPS = [
  {
    name: 'Personal details',
    id: 'personalDetails',
  },
  {
    name: 'Your profile',
    id: 'userProfile',
  },
  {
    name: 'Portfolio',
    id: 'portfolio',
  },
];

const STEPS_TO_COMPONENT_MAP = {
  personalDetails: PersonalInformation,
  userProfile: UserProfile,
  portfolio: Portfolio,
};

const CreatorOnboardingForm = () => {
  const [step, setStep] = useState(STEPS[0]);
  const router = useRouter();
  const { getLoggedInUser } = useAuth();

  const [createUserInfo, { data, error, loading }] = useMutation(
    CREATE_USER_INFO,
    {
      onCompleted: () => {
        getLoggedInUser().then(() =>
          router.push('/', undefined, { shallow: true })
        );
      },
    }
  );

  const lastCompletedStepIdx = STEPS.findIndex((s) => s.id === step.id) - 1;

  const lastCompletedStep =
    lastCompletedStepIdx >= 0 ? STEPS[lastCompletedStepIdx] : STEPS[0];

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      city: '',
      country: null,
      profilePicture: null,
      website: '',
      socialLinks: {
        youtube: '',
        tiktok: '',
        instagram: '',
        facebook: '',
      },
      bio: '',
      interestIds: [],
      skillIds: [],
      works: [],
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      const profilePic = values?.profilePicture
        ? await uploadPhoto(values.profilePicture)
        : null;
      // TODO refactor me

      const getFileStrings = async (attachments) =>
        await Promise.all(
          attachments.map(async (i) => {
            const data = await uploadPhoto(i);
            return data.src;
          })
        );

      const works = await Promise.all(
        values?.works?.map(async (el, idx) => ({
            ...el,
            attachments: el.attachments
              ? await getFileStrings(el.attachments)
              : [],
          }))
      );
      createUserInfo({
        variables: {
          input: {
            ...values,
            profilePicture: profilePic?.src,
            interestIds: values.interestIds.map((c) => c._id),
            skillIds: values.skillIds.map((s) => s._id),
            works,
          },
        },
      });
    },
  });
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

  if (formik.isSubmitting) {
    return (
      <div className='w-full flex justify-center items-center mt-4 gap-5'>
        <h2 className='text-white font-bold text-3xl'>Creating your profile</h2>
        <LightSpinner />
      </div>
    );
  }

  const ActiveComponent = STEPS_TO_COMPONENT_MAP[step.id];
  return (
    <div className='space-y-6 w-full'>
      <div className='py-5 bg-white shadow px-5 py-5 sm:rounded-lg sm:p-6'>
        <Stepper
          steps={STEPS}
          setStep={setStep}
          currentStep={step.id}
          lastCompleted={lastCompletedStep.id}
        />
        <div className='py-6'>
          <ActiveComponent
            values={formik.values}
            handleSubmit={formik.handleSubmit}
            handleChange={formik.handleChange}
            setFieldValue={formik.setFieldValue}
          />
        </div>
      </div>
      <div className='flex justify-end'>
        {step.id !== STEPS[0].id ? (
          <button
            type='button'
            onClick={() => setStep(lastCompletedStep)}
            className='bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary'
          >
            Previous step
          </button>
        ) : null}
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
};

export default CreatorOnboardingForm;
