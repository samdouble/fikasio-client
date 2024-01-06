import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import envvars from 'utils/envvars';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(envvars.stripePublishKey);

const options = {
  amount: 1099,
  currency: 'usd',
  mode: 'subscription' as 'subscription',
  appearance: {
    /*...*/
  },
};

const SettingsPayments = () => (
  <Elements
    options={options}
    stripe={stripePromise}
  >
    <CheckoutForm />
  </Elements>
);

export default SettingsPayments;
