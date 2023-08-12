import { Dispatch } from 'redux';
import {
  getPayments as APIgetPayments,
  createPayment as APIcreatePayment,
} from './endpoints';
import { fetchOnceOperation } from '../fetchOperation';
import {
  createPaymentRequest,
  createPaymentResponse,
  getPaymentsRequest,
  getPaymentsResponse,
  PaymentAction,
} from './actions';
import { Payment } from './types';

type PaymentDispatch = Dispatch<PaymentAction>;

export function fetchPayments() {
  return fetchOnceOperation(
    getPaymentsRequest,
    getPaymentsResponse,
    APIgetPayments,
    state => state.payments,
    [],
  );
}

export function createPayment(payment: Payment) {
  return (dispatch: PaymentDispatch) => {
    dispatch(createPaymentRequest(payment));
    return APIcreatePayment(payment)
      .then(res => dispatch(createPaymentResponse({ ...res })));
  };
}
