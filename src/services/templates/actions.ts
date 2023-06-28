import { Template } from './types';

export enum TemplateActionTypes {
  CREATE_TEMPLATE_REQUEST = 'CREATE_TEMPLATE_REQUEST',
  CREATE_TEMPLATE_RESPONSE = 'CREATE_TEMPLATE_RESPONSE',
  GET_TEMPLATES_REQUEST = 'GET_TEMPLATES_REQUEST',
  GET_TEMPLATES_RESPONSE = 'GET_TEMPLATES_RESPONSE',
  UPDATE_TEMPLATE_REQUEST = 'UPDATE_TEMPLATE_REQUEST',
  UPDATE_TEMPLATE_RESPONSE = 'UPDATE_TEMPLATE_RESPONSE',
  PATCH_TEMPLATE_REQUEST = 'PATCH_TEMPLATE_REQUEST',
  PATCH_TEMPLATE_RESPONSE = 'PATCH_TEMPLATE_RESPONSE',
  DELETE_TEMPLATE_REQUEST = 'DELETE_TEMPLATE_REQUEST',
  DELETE_TEMPLATE_RESPONSE = 'DELETE_TEMPLATE_RESPONSE',
}

export type TemplateAction =
  | { type: TemplateActionTypes.CREATE_TEMPLATE_REQUEST; payload: { template: Template } }
  | { type: TemplateActionTypes.CREATE_TEMPLATE_RESPONSE; payload: { template: Template } }
  | { type: TemplateActionTypes.GET_TEMPLATES_REQUEST; payload: { templates: Template[] } }
  | { type: TemplateActionTypes.GET_TEMPLATES_RESPONSE; payload: { templates: Template[] } }
  | { type: TemplateActionTypes.UPDATE_TEMPLATE_REQUEST; payload: { id: string; template: Template } }
  | { type: TemplateActionTypes.UPDATE_TEMPLATE_RESPONSE; payload: { template: Template } }
  | { type: TemplateActionTypes.PATCH_TEMPLATE_REQUEST; payload: { id: string; template: Partial<Template> } }
  | { type: TemplateActionTypes.PATCH_TEMPLATE_RESPONSE; payload: { template: Template } }
  | { type: TemplateActionTypes.DELETE_TEMPLATE_REQUEST; payload: { templateId: string } }
  | { type: TemplateActionTypes.DELETE_TEMPLATE_RESPONSE; payload: { templateId: string } };

export const createTemplateRequest = (template: Template): TemplateAction => ({
  type: TemplateActionTypes.CREATE_TEMPLATE_REQUEST,
  payload: { template },
});

export const createTemplateResponse = (payload: { template: Template }): TemplateAction => ({
  type: TemplateActionTypes.CREATE_TEMPLATE_RESPONSE,
  payload,
});

export const getTemplatesRequest = (payload: { templates: Template[] }): TemplateAction => ({
  type: TemplateActionTypes.GET_TEMPLATES_REQUEST,
  payload,
});

export const getTemplatesResponse = (payload: { templates: Template[] }): TemplateAction => ({
  type: TemplateActionTypes.GET_TEMPLATES_RESPONSE,
  payload,
});

export const updateTemplateRequest = (id: string, template: Template): TemplateAction => ({
  type: TemplateActionTypes.UPDATE_TEMPLATE_REQUEST,
  payload: { id, template },
});

export const updateTemplateResponse = (payload: { template: Template }): TemplateAction => ({
  type: TemplateActionTypes.UPDATE_TEMPLATE_RESPONSE,
  payload,
});

export const patchTemplateRequest = (id: string, template: Partial<Template>): TemplateAction => ({
  type: TemplateActionTypes.PATCH_TEMPLATE_REQUEST,
  payload: { id, template },
});

export const patchTemplateResponse = (payload: { template: Template }): TemplateAction => ({
  type: TemplateActionTypes.PATCH_TEMPLATE_RESPONSE,
  payload,
});

export const deleteTemplateRequest = (templateId: string): TemplateAction => ({
  type: TemplateActionTypes.DELETE_TEMPLATE_REQUEST,
  payload: { templateId },
});

export const deleteTemplateResponse = (payload: { templateId: string }): TemplateAction => ({
  type: TemplateActionTypes.DELETE_TEMPLATE_RESPONSE,
  payload,
});
