import { Payment } from './types';

export enum PaymentActionTypes {
  CREATE_PAYMENT_REQUEST = 'CREATE_PAYMENT_REQUEST',
  CREATE_PAYMENT_RESPONSE = 'CREATE_PAYMENT_RESPONSE',
  GET_PAYMENTS_REQUEST = 'GET_PAYMENTS_REQUEST',
  GET_PAYMENTS_RESPONSE = 'GET_PAYMENTS_RESPONSE',
}

export type PaymentAction =
  | { type: PaymentActionTypes.CREATE_PAYMENT_REQUEST; payload: { payment: Payment } }
  | { type: PaymentActionTypes.CREATE_PAYMENT_RESPONSE; payload: { payment: Payment } }
  | { type: PaymentActionTypes.GET_PAYMENTS_REQUEST; payload: { payments: Payment[] } }
  | { type: PaymentActionTypes.GET_PAYMENTS_RESPONSE; payload: { payments: Payment[] } };

export const createPaymentRequest = (payment: Payment): PaymentAction => ({
  type: PaymentActionTypes.CREATE_PAYMENT_REQUEST,
  payload: { payment },
});

export const createPaymentResponse = (payload: { payment: Payment }): PaymentAction => ({
  type: PaymentActionTypes.CREATE_PAYMENT_RESPONSE,
  payload,
});

export const getPaymentsRequest = (payload: { payments: Payment[] }): PaymentAction => ({
  type: PaymentActionTypes.GET_PAYMENTS_REQUEST,
  payload,
});

export const getPaymentsResponse = (payload: { payments: Payment[] }): PaymentAction => ({
  type: PaymentActionTypes.GET_PAYMENTS_RESPONSE,
  payload,
});
