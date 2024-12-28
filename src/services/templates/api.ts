import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import envvars from 'utils/envvars';
import { Template, TemplateField } from './types';

export const apiTemplates = createApi({
  reducerPath: 'templatesApi',
  tagTypes: ['Template'],
  baseQuery: fetchBaseQuery({
    baseUrl: (process.env.NODE_ENV === 'production')
      ? `${envvars.apiServer}/v1`
      : 'http://localhost:3000/v1/',
    credentials: 'include',
  }),
  endpoints: builder => ({
    getTemplates: builder.query<Template[], void>({
      query: () => 'templates',
      transformResponse: (data: { templates: Template[] }) => data.templates,
      transformErrorResponse: (response: { status: string | number }) => response.status,
      providesTags: ['Template'],
    }),
    getTemplate: builder.query<Template, string>({
      query: id => `templates/${id}`,
      transformResponse: (data: { template: Template }) => data.template,
      transformErrorResponse: (response: { status: string | number }) => response.status,
      providesTags: ['Template'],
    }),
    addTemplate: builder.mutation<Template, Partial<Template>>({
      query: body => ({
        url: `templates`,
        method: 'POST',
        body,
      }),
      transformResponse: (data: { template: Template }) => data.template,
      transformErrorResponse: (response: { status: string | number }) => response.status,
      invalidatesTags: ['Template'],
    }),
    patchTemplate: builder.mutation<Template, Partial<Template> & Pick<Template, 'id'>>({
      query: ({ id, ...body }) => ({
        url: `templates/${id}`,
        method: 'PATCH',
        body,
      }),
      transformResponse: (data: { template: Template }) => data.template,
      transformErrorResponse: (response: { status: string | number }) => response.status,
      invalidatesTags: ['Template'],
    }),
    updateTemplate: builder.mutation<Template, Partial<Template> & Pick<Template, 'id'>>({
      query: ({ id, ...body }) => ({
        url: `templates/${id}`,
        method: 'PUT',
        body,
      }),
      transformResponse: (data: { template: Template }) => data.template,
      transformErrorResponse: (response: { status: string | number }) => response.status,
      invalidatesTags: ['Template'],
    }),
    deleteTemplate: builder.mutation<string, string>({
      query: id => ({
        url: `templates/${id}`,
        method: 'DELETE',
      }),
      transformResponse: (data: { templateId: string }) => data.templateId,
      transformErrorResponse: (response: { status: string | number }) => response.status,
      invalidatesTags: ['Template'],
    }),

    // Fields
    getFieldsInTemplate: builder.query<TemplateField[], string>({
      query: templateId => `templates/${templateId}/fields`,
      transformResponse: (data: { fields: TemplateField[] }) => data.fields,
      transformErrorResponse: (response: { status: string | number }) => response.status,
      providesTags: ['Template'],
    }),
    addFieldToTemplate: builder.mutation<TemplateField, Partial<Template> & { templateId: string; }>({
      query: ({ templateId, ...body }) => ({
        url: `templates/${templateId}/fields`,
        method: 'POST',
        body,
      }),
      transformResponse: (data: { field: TemplateField }) => data.field,
      transformErrorResponse: (response: { status: string | number }) => response.status,
      invalidatesTags: ['Template'],
    }),
    patchFieldInTemplate: builder.mutation<TemplateField, Partial<Template> & Pick<Template, 'id'> & { templateId: string; }>({
      query: ({ templateId, id, ...body }) => ({
        url: `templates/${templateId}/fields/${id}`,
        method: 'PATCH',
        body,
      }),
      transformResponse: (data: { field: TemplateField }) => data.field,
      transformErrorResponse: (response: { status: string | number }) => response.status,
      invalidatesTags: ['Template'],
    }),
    updateFieldInTemplate: builder.mutation<TemplateField, Partial<Template> & Pick<Template, 'id'> & { templateId: string; }>({
      query: ({ templateId, id, ...body }) => ({
        url: `templates/${templateId}/fields/${id}`,
        method: 'PUT',
        body,
      }),
      transformResponse: (data: { field: TemplateField }) => data.field,
      transformErrorResponse: (response: { status: string | number }) => response.status,
      invalidatesTags: ['Template'],
    }),
    deleteFieldFromTemplate: builder.mutation<string, Pick<Template, 'id'> & { templateId: string; }>({
      query: ({ templateId, id }) => ({
        url: `templates/${templateId}/fields/${id}`,
        method: 'DELETE',
      }),
      transformResponse: (data: { templateId: string }) => data.templateId,
      transformErrorResponse: (response: { status: string | number }) => response.status,
      invalidatesTags: ['Template'],
    }),
  }),
});

export const {
  useGetTemplatesQuery,
  useLazyGetTemplateQuery,
  useAddTemplateMutation,
  usePatchTemplateMutation,
  useUpdateTemplateMutation,
  useDeleteTemplateMutation,
  // Fields
  useGetFieldsInTemplateQuery,
  useAddFieldToTemplateMutation,
  usePatchFieldInTemplateMutation,
  useUpdateFieldInTemplateMutation,
  useDeleteFieldFromTemplateMutation,
} = apiTemplates;
