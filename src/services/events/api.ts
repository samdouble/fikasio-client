import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import envvars from 'utils/envvars';
import { Event } from './types';

export const apiEvents = createApi({
  reducerPath: 'eventsApi',
  tagTypes: ['Event'],
  baseQuery: fetchBaseQuery({
    baseUrl: (process.env.NODE_ENV === 'production')
      ? `${envvars.apiServer}/v1`
      : 'http://localhost:3000/v1/',
    credentials: 'include',
  }),
  endpoints: builder => ({
    getEventsForProject: builder.query<Event[], string>({
      query: id => `projects/${id}/events`,
      transformResponse: (data: { events: Event[] }) => data.events,
      transformErrorResponse: (response: { status: string | number }) => response.status,
      providesTags: ['Event'],
    }),
  }),
});

export const {
  useGetEventsForProjectQuery,
} = apiEvents;
