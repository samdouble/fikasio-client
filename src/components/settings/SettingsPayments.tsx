import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe('pk_live_51NsEz8KsWRKy5brs9jgTxeVr3QBqxX9ibkrKEh11Ec7EsL57sJxLXMVoTmXUgw3TkT4Aj5XqnxPnDcuh3nviMglv00v3bl46s6');

const options = {
  amount: 1099,
  currency: 'usd',
  mode: 'subscription' as 'subscription',
  // Fully customizable with appearance API.
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
