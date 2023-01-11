import { loadStripe } from '@stripe/stripe-js/pure';
import { Elements, useElements, useStripe } from '@stripe/react-stripe-js';
import { PaymentElement } from '@stripe/react-stripe-js';
import { LoadingOverlay, Button, Group, Modal } from '@mantine/core';
import { useState } from 'react';
import { LightSpinner } from 'components/Shared/Spinner';

const CheckoutForm = ({ application, handleClose, isLoading, setIsLoading}) => {
  const elements = useElements();
  const stripe = useStripe();
  const handleSubmit = async () => {
    setIsLoading(true);
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: window.location.href,
      },
    });
    if (error) {
      alert('Payment could not be completed. Please try again.');
    }
  };
  return (
    <>
      <h2 className='py-4 font-bold'>
        Pay: {application?.price || application.job.price} RON to{' '}
        {application?.creator?.firstName} {application?.creator?.lastName}
      </h2>
      <PaymentElement />
      <div className='py-3 text-right flex flex-col gap-4'>
        {!isLoading ? (
          <>
            <button
              type='button'
              onClick={handleSubmit}
              className='w-full bg-secondary border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary'
            >
              Pay
            </button>
            <button
              type='button'
              onClick={handleClose}
              className='w-full bg-transparent border border-gray-600 rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-gray-600 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700'
            >
              Cancel
            </button>
          </>
        ) : (
          <LightSpinner />
        )}
      </div>
    </>
  );
};

const StripeComponent = ({ clientSecret, application, handleClose }) => {
  const options = {
    clientSecret,
  };
  const [isLoading, setIsLoading] = useState(false);

  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PB_KEY);

  if (!stripePromise) return null;
  return (
    <Modal opened={!!clientSecret} onClose={handleClose}>
      <LoadingOverlay overlayBlur={2} visible={isLoading}/>
      <Elements stripe={stripePromise} options={options}>
        <CheckoutForm application={application} handleClose={handleClose} isLoading={isLoading} setIsLoading={setIsLoading}/>
      </Elements>
    </Modal>
  );
};

export default StripeComponent;
