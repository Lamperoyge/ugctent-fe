import { useMutation } from '@apollo/client';
import { LightSpinner } from 'components/Shared/Spinner';
import { CONNECT_STRIPE } from 'graphql/mutations/userInfo';
import { useEffect } from 'react';

const VerifyPage = () => {
  const [connectStripe, { loading }] = useMutation(CONNECT_STRIPE, {
    onCompleted: (data) => {
      window.location.href = data.createUserInfoStripe.url;
    },
  });

  useEffect(() => {
    connectStripe();
  }, []);

  return (
    <div className='h-full w-full flex justify-center items-center'>
      <LightSpinner />
    </div>
  );
};

export default VerifyPage;
