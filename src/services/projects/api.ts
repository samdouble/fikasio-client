import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import envvars from 'utils/envvars';
import { Project } from './types';

export const apiProjects = createApi({
  reducerPath: 'projectsApi',
  tagTypes: ['Project'],
  baseQuery: fetchBaseQuery({
    baseUrl: (process.env.NODE_ENV === 'production')
      ? `${envvars.apiServer}/v1`
      : 'http://localhost:3000/v1/',
    credentials: 'include',
  }),
  endpoints: builder => ({
    getProjects: builder.query<Project[], void>({
      query: () => 'projects',
      transformResponse: (data: { projects: Project[] }) => data.projects,
      transformErrorResponse: (response: { status: string | number }) => response.status,
      providesTags: ['Project'],
    }),
    getProject: builder.query<Project, string>({
      query: id => `projects/${id}`,
      transformResponse: (data: { project: Project }) => data.project,
      transformErrorResponse: (response: { status: string | number }) => response.status,
      providesTags: ['Project'],
    }),
    addProject: builder.mutation<Project, Partial<Project>>({
      query: body => ({
        url: `projects`,
        method: 'POST',
        body,
      }),
      transformResponse: (data: { project: Project }) => data.project,
      transformErrorResponse: (response: { status: string | number }) => response.status,
      invalidatesTags: ['Project'],
    }),
    patchProject: builder.mutation<Project, Partial<Project> & Pick<Project, 'id'>>({
      query: ({ id, ...body }) => ({
        url: `projects/${id}`,
        method: 'PATCH',
        body,
      }),
      transformResponse: (data: { project: Project }) => data.project,
      transformErrorResponse: (response: { status: string | number }) => response.status,
      invalidatesTags: ['Project'],
    }),
    updateProject: builder.mutation<Project, Partial<Project> & Pick<Project, 'id'>>({
      query: ({ id, ...body }) => ({
        url: `projects/${id}`,
        method: 'PUT',
        body,
      }),
      transformResponse: (data: { project: Project }) => data.project,
      transformErrorResponse: (response: { status: string | number }) => response.status,
      invalidatesTags: ['Project'],
    }),
    deleteProject: builder.mutation<string, string>({
      query: id => ({
        url: `projects/${id}`,
        method: 'DELETE',
      }),
      transformResponse: (data: { projectId: string }) => data.projectId,
      transformErrorResponse: (response: { status: string | number }) => response.status,
      invalidatesTags: ['Project'],
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useLazyGetProjectQuery,
  useAddProjectMutation,
  usePatchProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} = apiProjects;
