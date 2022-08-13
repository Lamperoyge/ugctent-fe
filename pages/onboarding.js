import { useAuth } from 'hooks';
import Logo from 'components/Shared/Logo';
import {
  OrgOnboardingForm,
  CreatorOnboardingForm,
} from 'components/Onboarding';
import { USER_TYPES } from 'utils/constants';
/* 
Contributor fields:

firstName: string - required
lastName: string - required
profilePicture: string - not required
website: String - not required
bio: String - not required
city: String
country: String
companyName: String
taxId: String
socialLinks: [String]
category: String

Creator fields:

firstName: string - required
lastName: string - required
bio: string
city: string
profilePicture: string
interests: [string]
socialLinks: [String]
skillIds: [String]
interestIds: [String] - required
works: [{
    client name : String
    attachments: [] - max 3
    description: String
}]
*/

const ONBOARDING_FORM = {
  [USER_TYPES.ORG]: OrgOnboardingForm,
  [USER_TYPES.CREATOR]: CreatorOnboardingForm,
};
const OnboardingPage = () => {
  const { user } = useAuth();

  const Form = ONBOARDING_FORM[user?.userType];
  return (
    <div className='h-full w-full bg-primary'>
      <section className='py-8 leading-7 text-gray-900 sm:py-12 md:py-16 lg:py-24 bg-primary'>
        <div className='box-border px-4 mx-auto border-solid sm:px-6 md:px-6 lg:px-8 max-w-7xl'>
          <div className='flex flex-col items-center leading-7 text-center text-gray-900 border-0 border-gray-200'>
            <Logo />
            <h2 className='box-border m-0 my-4 text-3xl font-semibold leading-tight tracking-tight text-white border-solid sm:text-4xl md:text-5xl'>
              Welcome! Let's set up your profile
            </h2>
          </div>
        </div>
        <div className='grid grid-cols-1 gap-4 mt-4 leading-7 text-gray-900 border-0 border-gray-200 sm:mt-6 sm:gap-4 md:mt-8 md:gap-0'>
          <div className='w-full relative z-20 flex flex-col items-center max-w-7xl p-4 mx-auto my-0 bg-primary border-4 border-primary border-solid rounded-lg sm:p-6 md:px-8 md:py-16'>
            <Form />
          </div>
        </div>
      </section>
    </div>
  );
};

export default OnboardingPage;