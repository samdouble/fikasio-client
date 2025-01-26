import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import envvars from 'utils/envvars';
import { Payment } from './types';

export const apiPayments = createApi({
  reducerPath: 'paymentsApi',
  tagTypes: ['Payment'],
  baseQuery: fetchBaseQuery({
    baseUrl: (process.env.NODE_ENV === 'production')
      ? `${envvars.apiServer}/v1`
      : 'http://localhost:3000/v1/',
    credentials: 'include',
  }),
  endpoints: builder => ({
    getPayments: builder.query<Payment[], void>({
      query: () => 'payments',
      transformResponse: (data: { payments: Payment[] }) => data.payments,
      transformErrorResponse: (response: { status: string | number }) => response.status,
      providesTags: ['Payment'],
    }),
    getPayment: builder.query<Payment, string>({
      query: id => `payments/${id}`,
      transformResponse: (data: { payment: Payment }) => data.payment,
      transformErrorResponse: (response: { status: string | number }) => response.status,
      providesTags: ['Payment'],
    }),
    addPayment: builder.mutation<Payment, Partial<Payment>>({
      query: body => ({
        url: `payments`,
        method: 'POST',
        body,
      }),
      transformResponse: (data: { payment: Payment }) => data.payment,
      transformErrorResponse: (response: { status: string | number }) => response.status,
      invalidatesTags: ['Payment'],
    }),
  }),
});

export const {
  useGetPaymentsQuery,
  useLazyGetPaymentQuery,
  useAddPaymentMutation,
} = apiPayments;
