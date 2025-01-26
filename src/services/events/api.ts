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
    getEvents: builder.query<Event[], any>({
      query: ({
        type,
        objectiveId,
      }) => {
        return {
          url: 'events',
          params: {
            type,
            objectiveId,
          },
        };
      },
      transformResponse: (data: { events: Event[] }) => data.events,
      transformErrorResponse: (response: { status: string | number }) => response.status,
      providesTags: ['Event'],
    }),
    getEventsForObjective: builder.query<Event[], string>({
      query: id => `objectives/${id}/events`,
      transformResponse: (data: { events: Event[] }) => data.events,
      transformErrorResponse: (response: { status: string | number }) => response.status,
      providesTags: ['Event'],
    }),
    getEventsForProject: builder.query<Event[], string>({
      query: id => `projects/${id}/events`,
      transformResponse: (data: { events: Event[] }) => data.events,
      transformErrorResponse: (response: { status: string | number }) => response.status,
      providesTags: ['Event'],
    }),
  }),
});

export const {
  useLazyGetEventsQuery,
  useGetEventsForObjectiveQuery,
  useGetEventsForProjectQuery,
} = apiEvents;
