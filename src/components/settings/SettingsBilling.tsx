import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import envvars from 'utils/envvars';
import CheckoutForm from './payments/CheckoutForm';

const stripePromise = loadStripe(envvars.stripePublishKey);

const options = {
  amount: 199,
  currency: 'usd',
  mode: 'subscription' as 'subscription',
  appearance: {
    /*...*/
  },
};

const SettingsBilling = () => (
  <Elements
    options={options}
    stripe={stripePromise}
  >
    <CheckoutForm />
  </Elements>
);

export default SettingsBilling;
