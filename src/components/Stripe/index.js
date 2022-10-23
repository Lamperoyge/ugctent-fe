import { loadStripe } from '@stripe/stripe-js/pure';
import {Elements} from '@stripe/react-stripe-js';
import {PaymentElement} from '@stripe/react-stripe-js';

const CheckoutForm = () => {
  return (
    <form>
      <PaymentElement />
      <button>Submit</button>
    </form>
  );
};

const StripeComponent = ({clientSecret}) => {
  const options = {
    clientSecret
  }

  console.log(process.env.NEXT_PUBLIC_STRIPE_PB_KEY)
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PB_KEY);

  if(!stripePromise) return null;
  return <Elements stripe={stripePromise} options={options}> 
  <CheckoutForm />
  </Elements>
};

export default StripeComponent;
