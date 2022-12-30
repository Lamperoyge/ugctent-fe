import { useQuery } from '@apollo/client';
import PageSpinner from 'components/PageSpinner';
import { useRouter } from 'next/router';
import { logout } from 'components/Auth';
import { VERIFY_FORGOT_PASSWORD_TOKEN } from 'graphql/queries';

const VerifyTokenPage = () => {
    const router = useRouter()
  const { token } = router.query;
  const { data, error, loading } = useQuery(VERIFY_FORGOT_PASSWORD_TOKEN, {
    variables: {
      token,
    },
    skip: !token,
  });
  if (error && !loading) {
    logout();
  }

  if(data?.verifyForgotPasswordToken && !loading && !error) {
    router.push({
        pathname: `/reset-password/${token}`,
    })
  }
  return <PageSpinner />;
};

export default VerifyTokenPage;
