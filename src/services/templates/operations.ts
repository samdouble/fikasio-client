import { Dispatch } from 'redux';
import {
  getTemplates as APIgetTemplates,
  createTemplate as APIcreateTemplate,
  updateTemplate as APIupdateTemplate,
  patchTemplate as APIpatchTemplate,
  deleteTemplate as APIdeleteTemplate,
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
  TemplateAction,
} from './actions';
import { Template } from './types';

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

const operations = {
  fetchTemplates,
  createTemplate,
  updateTemplate,
  patchTemplate,
  deleteTemplate,
};

export default operations;
