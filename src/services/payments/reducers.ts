import { PaymentAction, PaymentActionTypes } from './actions';
import { Payment } from './types';

export default function reducer(state: Payment[] | null = null, action: PaymentAction) {
  switch (action.type) {
    case PaymentActionTypes.GET_PAYMENTS_RESPONSE:
      const newPayments = action.payload.payments;
      return (state || []).concat(newPayments);
    case PaymentActionTypes.CREATE_PAYMENT_RESPONSE:
      return (state || []).concat(action.payload.payment);
    default:
      return state;
  }
}
