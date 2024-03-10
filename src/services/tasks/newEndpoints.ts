import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import envvars from 'utils/envvars';
import type { Task } from './types';

const server = (process.env.NODE_ENV === 'production') ? envvars.apiServer : '';

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: `${server}/v1/` }),
  keepUnusedDataFor: 30,
  endpoints: builder => ({
    getTasks: builder.query<Task[], { filter?: string; }>({
      query: arg => {
        const { filter } = arg;
        console.log('arg: ', arg);
        return {
          url: 'tasks',
          params: { filter },
        };
      },
      transformResponse: (response: any) => response.tasks,
    }),
  }),
});


export const { useGetTasksQuery } = api;

