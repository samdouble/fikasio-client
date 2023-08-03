import { Dispatch } from 'redux';
import {
  getTemplates as APIgetTemplates,
  createTemplate as APIcreateTemplate,
  updateTemplate as APIupdateTemplate,
  patchTemplate as APIpatchTemplate,
  deleteTemplate as APIdeleteTemplate,
  getFields as APIgetFields,
  createField as APIcreateField,
  updateField as APIupdateField,
  patchField as APIpatchField,
  deleteField as APIdeleteField,
} from './endpoints';
import { fetchOnceOperation } from '../fetchOperation';
import {
  createTemplateRequest,
  createTemplateResponse,
  getTemplatesRequest,
  getTemplatesResponse,
  updateTemplateRequest,
  updateTemplateResponse,
  patchTemplateRequest,
  patchTemplateResponse,
  deleteTemplateRequest,
  deleteTemplateResponse,
  createFieldRequest,
  createFieldResponse,
  getFieldsRequest,
  getFieldsResponse,
  updateFieldRequest,
  updateFieldResponse,
  patchFieldRequest,
  patchFieldResponse,
  deleteFieldRequest,
  deleteFieldResponse,
  TemplateAction,
} from './actions';
import { Template, TemplateField } from './types';

type TemplateDispatch = Dispatch<TemplateAction>;

function fetchTemplates() {
  return fetchOnceOperation(
    getTemplatesRequest,
    getTemplatesResponse,
    APIgetTemplates,
    state => state.templates,
    [],
  );
}

function createTemplate(template: Template) {
  return (dispatch: TemplateDispatch) => {
    dispatch(createTemplateRequest(template));
    return APIcreateTemplate(template)
      .then(res => dispatch(createTemplateResponse({ ...res })));
  };
}

function updateTemplate(id: string, template: Template) {
  return (dispatch: TemplateDispatch) => {
    dispatch(updateTemplateRequest(id, template));
    return APIupdateTemplate(id, template)
      .then(res => dispatch(updateTemplateResponse({ ...res })));
  };
}

function patchTemplate(id: string, template: Partial<Template>) {
  return (dispatch: TemplateDispatch) => {
    dispatch(patchTemplateRequest(id, template));
    return APIpatchTemplate(id, template)
      .then(res => dispatch(patchTemplateResponse({ ...res })));
  };
}

function deleteTemplate(id: string) {
  return (dispatch: TemplateDispatch) => {
    dispatch(deleteTemplateRequest(id));
    return APIdeleteTemplate(id)
      .then(res => dispatch(deleteTemplateResponse({ ...res })));
  };
}

function fetchFields(filter) {
  return fetchOnceOperation(
    getFieldsRequest,
    getFieldsResponse,
    APIgetFields,
    state => state.fields,
    [filter],
  );
}

function createField(templateId: string, field: TemplateField) {
  return (dispatch: TemplateDispatch) => {
    dispatch(createFieldRequest({ templateId, field }));
    return APIcreateField(templateId, field)
      .then(res => dispatch(createFieldResponse({ templateId, ...res })));
  };
}

function updateField(templateId: string, id: string, field: TemplateField) {
  return (dispatch: TemplateDispatch) => {
    dispatch(updateFieldRequest({ templateId, id, field }));
    return APIupdateField(templateId, id, field)
      .then(res => dispatch(updateFieldResponse({ templateId, ...res })));
  };
}

function patchField(templateId: string, id, field: Partial<TemplateField>) {
  return (dispatch: TemplateDispatch) => {
    dispatch(patchFieldRequest({ templateId, id, field }));
    return APIpatchField(templateId, id, field)
      .then(res => dispatch(patchFieldResponse({ templateId, ...res })));
  };
}

function deleteField(templateId: string, fieldId: string) {
  return (dispatch: TemplateDispatch) => {
    dispatch(deleteFieldRequest({ templateId, fieldId }));
    return APIdeleteField(templateId, fieldId)
      .then(res => dispatch(deleteFieldResponse({ templateId, ...res })));
  };
}

const operations = {
  fetchTemplates,
  createTemplate,
  updateTemplate,
  patchTemplate,
  deleteTemplate,
  fields: {
    fetchFields,
    createField,
    updateField,
    patchField,
    deleteField,
  },
};

export default operations;
