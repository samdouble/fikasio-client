import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import envvars from 'utils/envvars';
import { Objective } from './types';

export const apiObjectives = createApi({
  reducerPath: 'objectivesApi',
  tagTypes: ['Objective'],
  baseQuery: fetchBaseQuery({
    baseUrl: (process.env.NODE_ENV === 'production')
      ? `${envvars.apiServer}/v1`
      : 'http://localhost:3000/v1/',
    credentials: 'include',
  }),
  endpoints: builder => ({
    getObjectives: builder.query<Objective[], void>({
      query: () => 'objectives',
      transformResponse: (data: { objectives: Objective[] }) => data.objectives,
      transformErrorResponse: (response: { status: string | number }) => response.status,
      providesTags: ['Objective'],
    }),
    getObjective: builder.query<Objective, string>({
      query: id => `objectives/${id}`,
      transformResponse: (data: { objective: Objective }) => data.objective,
      transformErrorResponse: (response: { status: string | number }) => response.status,
      providesTags: ['Objective'],
    }),
    addObjective: builder.mutation<Objective, Partial<Objective>>({
      query: body => ({
        url: `objectives`,
        method: 'POST',
        body,
      }),
      transformResponse: (data: { objective: Objective }) => data.objective,
      transformErrorResponse: (response: { status: string | number }) => response.status,
      invalidatesTags: ['Objective'],
    }),
    patchObjective: builder.mutation<Objective, Partial<Objective> & Pick<Objective, 'id'>>({
      query: ({ id, ...body }) => ({
        url: `objectives/${id}`,
        method: 'PATCH',
        body,
      }),
      transformResponse: (data: { objective: Objective }) => data.objective,
      transformErrorResponse: (response: { status: string | number }) => response.status,
      invalidatesTags: ['Objective'],
    }),
    updateObjective: builder.mutation<Objective, Partial<Objective> & Pick<Objective, 'id'>>({
      query: ({ id, ...body }) => ({
        url: `objectives/${id}`,
        method: 'PUT',
        body,
      }),
      transformResponse: (data: { objective: Objective }) => data.objective,
      transformErrorResponse: (response: { status: string | number }) => response.status,
      invalidatesTags: ['Objective'],
    }),
    deleteObjective: builder.mutation<string, string>({
      query: id => ({
        url: `objectives/${id}`,
        method: 'DELETE',
      }),
      transformResponse: (data: { objectiveId: string }) => data.objectiveId,
      transformErrorResponse: (response: { status: string | number }) => response.status,
      invalidatesTags: ['Objective'],
    }),
  }),
});

export const {
  useGetObjectivesQuery,
  useLazyGetObjectiveQuery,
  useAddObjectiveMutation,
  usePatchObjectiveMutation,
  useUpdateObjectiveMutation,
  useDeleteObjectiveMutation,
} = apiObjectives;
