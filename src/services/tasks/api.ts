import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import envvars from 'utils/envvars';
import type { Task } from './types';

const server = (process.env.NODE_ENV === 'production') ? envvars.apiServer : '';

export const apiTasks = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: `${server}/v1/` }),
  keepUnusedDataFor: 30,
  endpoints: builder => ({
    getTasks: builder.query<Task[], { filter?: string; }>({
      query: arg => {
        const { filter } = arg;
        return {
          url: 'tasks',
          params: { filter },
        };
      },
      // query: ({
      //   filter = { date: { $gte: formatYYYYMMDD() }},
      //   sort,
      //   limit,
      // }) => {
      //   return {
      //     url: 'projects',
      //     params: {
      //       filter: JSON.stringify(filter),
      //       sort: JSON.stringify(sort),
      //       limit,
      //     },
      //   };
      // },
      transformResponse: (response: any) => response.tasks,
    }),
  }),
});

export const { useGetTasksQuery } = apiTasks;
