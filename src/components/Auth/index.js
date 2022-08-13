import { AuthContext } from 'contexts';
import { useRouter } from 'next/router';
import apollo from 'services/apollo-client';
import { GET_LOGGED_IN_USER } from 'graphql/queries';
import { useLazyQuery, useMutation } from '@apollo/client';
import { useState, useEffect } from 'react';
import { EMAIL_SIGN_UP, EMAIL_SIGN_IN } from 'graphql/mutations';
import { EXCLUDED_PATHS } from 'utils/constants';

export const getAuthHeader = () => {
  return localStorage.getItem('ugctent-token') || null;
};

export const logout = async () => {
  try {
    localStorage.removeItem('ugctent-token');
    await apollo.clearStore();
    window.location.href = '/';
  } catch (exception) {
    return false;
  }
};

export const storeAuthHeader = async (token) => {
  if (token) {
    localStorage.setItem('ugctent-token', token);
  }
};

const Auth = ({ children }) => {
  //TODO test me more
  const router = useRouter();
  const localStorageToken = typeof window !== 'undefined' && getAuthHeader();
  const [token, setToken] = useState(localStorageToken);
  const [tokenLoading, setTokenLoading] = useState(true);
  const [
    emailSignUp,
    { data: emailSignupData, loading, error: emailSignupError },
  ] = useMutation(EMAIL_SIGN_UP, {
    onCompleted: ({ emailSignUp }) => {
      storeAuthHeader(emailSignUp?.token);
      setToken(emailSignUp?.token);
    },
    onError: (e) => console.log(e),
  });

  const [
    emailSignIn,
    { data: emailSignInData, loading: signInLoading, error: signInError },
  ] = useMutation(EMAIL_SIGN_IN, {
    onCompleted: ({ emailSignIn }) => {
      storeAuthHeader(emailSignIn?.token);
      setToken(emailSignIn?.token);
    },
    onError: (e) => console.log(e),
  });

  const [getLoggedInUser, { data, error }] = useLazyQuery(GET_LOGGED_IN_USER, {
    onCompleted: () => {
      setTokenLoading(false);
    },
    onError: () => setTokenLoading(false),
  });

  useEffect(() => {
    if (token && !emailSignupData?.token && !emailSignInData?.token)
      getLoggedInUser();
    else {
      setTokenLoading(false);
    }
  }, [token]);

  const signUp = (values) => {
    emailSignUp({
      variables: {
        input: {
          email: values.email,
          password: values.password,
          userType: values.userType,
        },
      },
    });
  };

  const signIn = (values) =>
    emailSignIn({
      variables: { input: { email: values.email, password: values.password } },
    });
  if (
    error?.graphQLErrors &&
    error?.graphQLErrors[0]?.extensions.code === 'UNAUTHENTICATED' &&
    !EXCLUDED_PATHS.includes(router.pathname)
  ) {
    logout();
  }

  if (tokenLoading) {
    return <div>spinner...</div>;
  }
  if (!tokenLoading) {
    if (!EXCLUDED_PATHS.includes(router.pathname) && !token) {
      window.location.href = '/login';
      return null;
    }
    if (
      token &&
      EXCLUDED_PATHS.includes(router.pathname) &&
      data?.getLoggedInUser
    ) {
      data?.getLoggedInUser?.isOnboarded
        ? router.push('/')
        : router.push('/onboarding');
      return null;
    }
    if (
      data?.getLoggedInUser &&
      !data?.getLoggedInUser.isOnboarded &&
      !router.pathname.includes('/onboarding')
    ) {
      router.push('/onboarding');
      return null;
    }
    return (
      <AuthContext.Provider
        value={{
          user: data?.getLoggedInUser,
          signUp,
          emailSignupError,
          signIn,
          signInError,
          signupLoading: loading,
          signInLoading,
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  }
  return null;
};

export default Auth;
