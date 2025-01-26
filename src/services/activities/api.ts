import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import envvars from 'utils/envvars';
import { Activity } from './types';

export const apiActivities = createApi({
  reducerPath: 'activitiesApi',
  tagTypes: ['Activity'],
  baseQuery: fetchBaseQuery({
    baseUrl: (process.env.NODE_ENV === 'production')
      ? `${envvars.apiServer}/v1`
      : 'http://localhost:3000/v1/',
    credentials: 'include',
  }),
  endpoints: builder => ({
    getActivities: builder.query<Activity[], any>({
      query: ({
        filter,
        sort,
        q,
      }) => {
        return {
          url: 'activities',
          params: {
            filter: JSON.stringify(filter),
            sort: JSON.stringify(sort),
            q,
          },
        };
      },
      transformResponse: (data: { activities: Activity[] }) => data.activities,
      transformErrorResponse: (response: { status: string | number }) => response.status,
      providesTags: ['Activity'],
    }),
    getActivity: builder.query<Activity, string>({
      query: id => `activities/${id}`,
      transformResponse: (data: { activity: Activity }) => data.activity,
      transformErrorResponse: (response: { status: string | number }) => response.status,
      providesTags: ['Activity'],
    }),
    addActivity: builder.mutation<Activity, Partial<Activity>>({
      query: body => ({
        url: `activities`,
        method: 'POST',
        body,
      }),
      transformResponse: (data: { activity: Activity }) => data.activity,
      transformErrorResponse: (response: { status: string | number }) => response.status,
      invalidatesTags: ['Activity'],
    }),
    patchActivity: builder.mutation<Activity, Partial<Activity> & Pick<Activity, 'id'>>({
      query: ({ id, ...body }) => ({
        url: `activities/${id}`,
        method: 'PATCH',
        body,
      }),
      transformResponse: (data: { activity: Activity }) => data.activity,
      transformErrorResponse: (response: { status: string | number }) => response.status,
      invalidatesTags: ['Activity'],
    }),
    updateActivity: builder.mutation<Activity, Partial<Activity> & Pick<Activity, 'id'>>({
      query: ({ id, ...body }) => ({
        url: `activities/${id}`,
        method: 'PUT',
        body,
      }),
      transformResponse: (data: { activity: Activity }) => data.activity,
      transformErrorResponse: (response: { status: string | number }) => response.status,
      invalidatesTags: ['Activity'],
    }),
    deleteActivity: builder.mutation<string, string>({
      query: id => ({
        url: `activities/${id}`,
        method: 'DELETE',
      }),
      transformResponse: (data: { activityId: string }) => data.activityId,
      transformErrorResponse: (response: { status: string | number }) => response.status,
      invalidatesTags: ['Activity'],
    }),
  }),
});

export const {
  useGetActivitiesQuery,
  useLazyGetActivitiesQuery,
  useLazyGetActivityQuery,
  useAddActivityMutation,
  usePatchActivityMutation,
  useUpdateActivityMutation,
  useDeleteActivityMutation,
} = apiActivities;
