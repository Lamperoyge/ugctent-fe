import { useGetCategories } from 'hooks';
import Stepper from 'components/Shared/Stepper';
import { useState } from 'react';
import CompanyProfile from './CompanyProfile';
import PersonalInformation from './PersonalInformation';

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
  const { categories, categoriesError, categoriesLoading } = useGetCategories();
  const [step, setStep] = useState(STEPS[0]);

  const lastCompletedStepIdx = STEPS.findIndex((s) => s.id === step.id) - 1;

  const lastCompletedStep =
    lastCompletedStepIdx >= 0 ? STEPS[lastCompletedStepIdx] : STEPS[0];

  const ActivePartComponent =
    step.id === 'companyProfile' ? CompanyProfile : PersonalInformation;
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
      <ActivePartComponent />

      <div className='flex justify-end'>
        <button
          type='button'
          className='bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary'
        >
          Cancel
        </button>
        <button
          type='submit'
          className='ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primaryOrange hover:bg-transparent hover:border-primaryOrange hover: text-priamryOrange focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary'
        >
          {step.id === STEPS[STEPS.length - 1].id ? 'Submit' : 'Next'}
        </button>
      </div>
    </div>
  );
}
