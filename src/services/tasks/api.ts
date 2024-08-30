import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Event } from 'services/events/types';
import envvars from 'utils/envvars';
import type { Task } from './types';

export const apiTasks = createApi({
  reducerPath: 'tasksApi',
  tagTypes: ['Task'],
  baseQuery: fetchBaseQuery({
    baseUrl: (process.env.NODE_ENV === 'production')
      ? `${envvars.apiServer}/v1`
      : 'http://localhost:3000/v1/',
    credentials: 'include',
  }),
  endpoints: builder => ({
    getTasks: builder.query<Task[], any>({
      query: ({
        filter,
      }) => {
        return {
          url: 'tasks',
          params: {
            filter: JSON.stringify(filter),
          },
        };
      },
      transformResponse: (data: { tasks: Task[] }) => data.tasks,
      transformErrorResponse: (response: { status: string | number }) => response.status,
      providesTags: ['Task'],
    }),
    getTask: builder.query<Task, string>({
      query: id => `tasks/${id}`,
      transformResponse: (data: { task: Task }) => data.task,
      transformErrorResponse: (response: { status: string | number }) => response.status,
      providesTags: ['Task'],
    }),
    getTaskComments: builder.query<string[], string>({
      query: id => `tasks/${id}/comments`,
      transformResponse: (data: { comments: string[] }) => data.comments,
      transformErrorResponse: (response: { status: string | number }) => response.status,
    }),
    getTaskEvents: builder.query<Event[], string>({
      query: id => `tasks/${id}/events`,
      transformResponse: (data: { events: Event[] }) => data.events,
      transformErrorResponse: (response: { status: string | number }) => response.status,
    }),
    addTask: builder.mutation<Task, Partial<Task>>({
      query: body => ({
        url: `tasks`,
        method: 'POST',
        body,
      }),
      transformResponse: (data: { task: Task }) => data.task,
      transformErrorResponse: (response: { status: string | number }) => response.status,
      invalidatesTags: ['Task'],
    }),
    patchTask: builder.mutation<Task, Partial<Task> & Pick<Task, 'id'>>({
      query: ({ id, ...body }) => ({
        url: `tasks/${id}`,
        method: 'PATCH',
        body,
      }),
      transformResponse: (data: { task: Task }) => data.task,
      transformErrorResponse: (response: { status: string | number }) => response.status,
      invalidatesTags: ['Task'],
    }),
    patchManyTasks: builder.mutation<string[], { ids: string[]; infos: any; }>({
      query: ({ ids, infos }) => ({
        url: `tasks/batch`,
        method: 'PATCH',
        body: {
          ids,
          infos,
        },
      }),
      transformResponse: (data: { ids: string[] }) => data.ids,
      transformErrorResponse: (response: { status: string | number }) => response.status,
      invalidatesTags: ['Task'],
    }),
    updateTask: builder.mutation<Task, Partial<Task> & Pick<Task, 'id'>>({
      query: ({ id, ...body }) => ({
        url: `tasks/${id}`,
        method: 'PUT',
        body,
      }),
      transformResponse: (data: { task: Task }) => data.task,
      transformErrorResponse: (response: { status: string | number }) => response.status,
      invalidatesTags: ['Task'],
    }),
    deleteTask: builder.mutation<string, string>({
      query: id => ({
        url: `tasks/${id}`,
        method: 'DELETE',
      }),
      transformResponse: (data: { taskId: string }) => data.taskId,
      transformErrorResponse: (response: { status: string | number }) => response.status,
      invalidatesTags: ['Task'],
    }),
    deleteManyTasks: builder.mutation<string[], { ids: string[]; }>({
      query: ({ ids }) => ({
        url: `tasks/batch`,
        method: 'DELETE',
        body: { ids },
      }),
      transformResponse: (data: { ids: string[] }) => data.ids,
      transformErrorResponse: (response: { status: string | number }) => response.status,
      invalidatesTags: ['Task'],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useLazyGetTaskQuery,
  useLazyGetTaskCommentsQuery,
  useLazyGetTaskEventsQuery,
  useAddTaskMutation,
  usePatchTaskMutation,
  usePatchManyTasksMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
  useDeleteManyTasksMutation,
} = apiTasks;
