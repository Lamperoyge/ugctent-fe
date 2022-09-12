import Link from 'next/link';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import Logo from 'components/Shared/Logo';
import { useAuth } from 'hooks';
import { SmallSpinner } from 'components/Shared/Spinner';

const SignIn = () => {
  const { signIn, signInError, signInLoading } = useAuth();
  const config = [
    {
      label: 'Email',
      type: 'email',
      name: 'email',
      placeholder: 'Enter your email',
    },

    {
      label: 'Password',
      type: 'password',
      name: 'password',
      placeholder: 'Password',
    },
  ];

  const schema = Yup.object({
    email: Yup.string()
      .email('Please enter a valid email')
      .required('Please enter an email'),
    password: Yup.string()
      .required('Password is required')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
      ),
  });

  const handleSubmit = (values) => signIn({ ...values });
  return (
    <div className='min-h-full flex'>
        <div className='flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24'>
          <div className='mx-auto w-full max-w-sm lg:w-96'>
            <div>
              <Logo />
              <h2 className='mt-6 text-3xl font-extrabold text-gray-900'>
                Sign in to your account
              </h2>
              {signInError?.message ? (
                <p className='py-4 text-xl font-semibold text-red-400'>
                  {signInError.message}
                </p>
              ) : null}
            </div>

            <div className='mt-8'>
              <div className='mt-6'>
                <Formik
                  initialValues={{}}
                  validationSchema={schema}
                  onSubmit={handleSubmit}
                >
                  {({
                    values,
                    handleChange,
                    handleSubmit,
                    errors,
                    touched,
                    handleBlur,
                  }) => (
                      <Form onSubmit={handleSubmit} className='space-y-6'>
                        {config.map((item, idx) => (
                            <div key={idx}>
                              <label className='block text-sm font-medium text-gray-700'>
                                {item.label}
                              </label>
                              <div className='mt-1'>
                                <input
                                  {...item}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values[item.name]}
                                  className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-secondary focus:border-secondary sm:text-sm'
                                />
                                {errors[item.name] && touched[item.name] && (
                                  <span className='text-md text-red-400'>
                                    {errors[item.name]}
                                  </span>
                                )}
                              </div>
                            </div>
                          ))}
                        <div className='text-sm'>
                          <Link href='/forgot-password'>
                            <a className='font-medium text-secondary hover:text-primary'>
                              Forgot your password?
                            </a>
                          </Link>
                        </div>

                        <div className='text-sm'>
                          <Link href='/signup'>
                            <a className='font-medium text-secondary hover:text-primary'>
                              Don't have an account? Sign up!
                            </a>
                          </Link>
                        </div>

                        <div>
                          <button
                            type='submit'
                            disabled={signInLoading}
                            className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-secondary hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary'
                          >
                            {signInLoading ? <SmallSpinner /> : 'Sign in'}
                          </button>
                        </div>
                      </Form>
                    )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
        <div className='hidden lg:block relative w-0 flex-1'>
          <img
            className='absolute inset-0 h-full w-full object-cover'
            src='https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80'
            alt=''
          />
        </div>
      </div>
  );
};

export default SignIn;
