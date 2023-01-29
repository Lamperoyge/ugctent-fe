import { useMutation } from '@apollo/client';
import { RESET_PASSWORD } from 'graphql/mutations';
import { useRouter } from 'next/router';
import Logo from 'components/Shared/Logo';
import Link from 'next/link';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { LightSpinner } from 'components/Shared/Spinner';

const ResetPassword = () => {
  const router = useRouter();
  const [resetPassword, { data, error, loading }] = useMutation(RESET_PASSWORD);
  const { token } = router.query;

  const config = [
    {
      label: 'Password',
      type: 'password',
      name: 'password',
      placeholder: 'Password',
    },
    {
      label: 'Confirm Password',
      type: 'password',
      name: 'confirm password',
      placeholder: 'Confirm Password',
    },
  ];
  const schema = Yup.object({
    password: Yup.string()
      .required('Password is required')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
      ),
    'confirm password': Yup.string()
      .required('Please confirm your password')
      .oneOf([Yup.ref('password'), null], 'Passwords must match'),
  });

  const handleSubmit = (values) => {
    resetPassword({ variables: { token, password: values.password } });
  };

  return (
    <div className='min-h-full flex'>
      <div className='flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24'>
        <div className='mx-auto w-full max-w-sm lg:w-96'>
          <div>
            <Logo />
            <h2 className='mt-6 text-3xl font-extrabold text-gray-900'>
              Reset password
            </h2>
          </div>

          <div className='mt-8'>
            <div className='mt-6'>
              {loading ? (
                <LightSpinner size='h-12 w-12' />
              ) : (
                <>
                  {data?.resetPassword ? (
                    <div className='flex gap-8 flex-col'>
                      <span className='text-xl font-bold text-gray-600 mt-6'>
                        Success! Your password is now reset
                      </span>
                      <button
                        type='submit'
                        onClick={() => router.push('/login')}
                        className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-secondary hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary'
                      >
                        Sign in
                      </button>
                    </div>
                  ) : (
                    <Formik
                      initialValues={{
                        termsAgreement: true,
                      }}
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
                      }: any) => (
                        <Form onSubmit={handleSubmit} className='space-y-6'>
                          {config.map((item, idx) => (
                            <div key={idx}>
                              {item.type === 'checkbox' ? (
                                <div className='flex items-center justify-center'>
                                  <input
                                    key={`${idx}`}
                                    name={`${item.name}`}
                                    defaultValue={values[item.name]}
                                    type='checkbox'
                                    defaultChecked={values[item.name]}
                                    className='h-6 w-6 border-gray-300 rounded text-secondary focus:ring-primary'
                                  />
                                  <label
                                    htmlFor={`${idx}`}
                                    className='ml-3 text-sm text-gray-500'
                                  >
                                    {item.label}
                                  </label>
                                </div>
                              ) : (
                                <>
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
                                    {errors[item.name] &&
                                      touched[item.name] && (
                                        <span className='text-md text-red-400'>
                                          {errors[item.name]}
                                        </span>
                                      )}
                                  </div>
                                </>
                              )}
                            </div>
                          ))}

                          <div className='text-sm'>
                            <Link
                              href='/login'
                              className='font-medium text-secondary hover:text-primary'
                            >
                              Sign in!
                            </Link>
                          </div>

                          <div>
                            <button
                              type='submit'
                              className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-secondary hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary'
                            >
                              Submit
                            </button>
                          </div>
                        </Form>
                      )}
                    </Formik>
                  )}
                </>
              )}
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

export default ResetPassword;
