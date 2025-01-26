import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import envvars from 'utils/envvars';
import { Card } from './types';

export const apiCards = createApi({
  reducerPath: 'cardsApi',
  tagTypes: ['Card'],
  baseQuery: fetchBaseQuery({
    baseUrl: (process.env.NODE_ENV === 'production')
      ? `${envvars.apiServer}/v1`
      : 'http://localhost:3000/v1/',
    credentials: 'include',
  }),
  endpoints: builder => ({
    getCards: builder.query<Card[], void>({
      query: () => '/users/me/cards',
      transformResponse: (data: { cards: Card[] }) => data.cards,
      transformErrorResponse: (response: { status: string | number }) => response.status,
      providesTags: ['Card'],
    }),
    getCard: builder.query<Card, string>({
      query: id => `/users/me/cards/${id}`,
      transformResponse: (data: { card: Card }) => data.card,
      transformErrorResponse: (response: { status: string | number }) => response.status,
      providesTags: ['Card'],
    }),
    addCard: builder.mutation<Card, Partial<Card>>({
      query: body => ({
        url: `/users/me/cards`,
        method: 'POST',
        body,
      }),
      transformResponse: (data: { card: Card }) => data.card,
      transformErrorResponse: (response: { status: string | number }) => response.status,
      invalidatesTags: ['Card'],
    }),
    patchCard: builder.mutation<Card, Partial<Card> & Pick<Card, 'id'>>({
      query: ({ id, ...body }) => ({
        url: `/users/me/cards/${id}`,
        method: 'PATCH',
        body,
      }),
      transformResponse: (data: { card: Card }) => data.card,
      transformErrorResponse: (response: { status: string | number }) => response.status,
      invalidatesTags: ['Card'],
    }),
    updateCard: builder.mutation<Card, Partial<Card> & Pick<Card, 'id'>>({
      query: ({ id, ...body }) => ({
        url: `/users/me/cards/${id}`,
        method: 'PUT',
        body,
      }),
      transformResponse: (data: { card: Card }) => data.card,
      transformErrorResponse: (response: { status: string | number }) => response.status,
      invalidatesTags: ['Card'],
    }),
    deleteCard: builder.mutation<string, string>({
      query: id => ({
        url: `/users/me/cards/${id}`,
        method: 'DELETE',
      }),
      transformResponse: (data: { cardId: string }) => data.cardId,
      transformErrorResponse: (response: { status: string | number }) => response.status,
      invalidatesTags: ['Card'],
    }),
  }),
});

export const {
  useGetCardsQuery,
  useLazyGetCardQuery,
  useAddCardMutation,
  usePatchCardMutation,
  useUpdateCardMutation,
  useDeleteCardMutation,
} = apiCards;
