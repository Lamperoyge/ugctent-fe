import { LightSpinner } from 'components/Shared/Spinner';
import Logo from 'components/Shared/Logo';
export const PageSpinner = () => (
  <div className='h-full w-full bg-primary'>
    <section className='py-8 leading-7 text-gray-900 sm:py-12 md:py-16 lg:py-24 bg-primary'>
      <div className='box-border px-4 mx-auto border-solid sm:px-6 md:px-6 lg:px-8 max-w-7xl'>
        <div className='flex flex-col items-center leading-7 text-center text-gray-900 border-0 border-gray-200'>
          <Logo />
        </div>
      </div>
      <div className='grid grid-cols-1 gap-4 mt-4 leading-7 text-gray-900 border-0 border-gray-200 sm:mt-6 sm:gap-4 md:mt-8 md:gap-0'>
        <div className='w-full relative flex flex-col items-center max-w-7xl p-4 mx-auto my-0 bg-primary border-4 border-primary border-solid rounded-lg sm:p-6 md:px-8 md:py-16'>
          <div className='w-full flex justify-center items-center mt-4 gap-5'>
            <LightSpinner size="h-12 w-12"/>
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default PageSpinner;
