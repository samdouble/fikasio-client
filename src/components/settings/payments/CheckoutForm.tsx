import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import {
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { useAddCardMutation } from 'services/cards/api';
import envvars from 'utils/envvars';

const CheckoutForm = () => {
  const { t } = useTranslation();
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [createCard] = useAddCardMutation();

  const handleSubmit = async e => {
    e.preventDefault();

    if (elements == null) {
      return;
    }

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setErrorMessage(submitError.message || null);
      return;
    }

    const clientSecret = await createCard({})
      .then(({ data }) => {
        if (data) {
          return data.stripePaymentIntent.client_secret;
        }
      });

    if (stripe) {
      const { error } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: envvars.stripeConfirmationUrl,
        },
      });
  
      if (error) {
        // This point will only be reached if there is an immediate error when
        // confirming the payment. Show error to your customer (for example, payment
        // details incomplete)
        setErrorMessage(error.message || null);
      } else {
        // Your customer will be redirected to your `return_url`. For some payment
        // methods like iDEAL, your customer will be redirected to an intermediate
        // site first to authorize the payment, then redirected to the `return_url`.
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <Button
        disabled={!stripe || !elements}
        onClick={e => handleSubmit(e)}
        style={{
          float: 'right',
        }}
        variant="success"
      >
        {t('pay')}
      </Button>
      {
        errorMessage && <div>{errorMessage}</div>
      }
    </form>
  );
};

export default CheckoutForm;
