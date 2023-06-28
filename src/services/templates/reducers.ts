import uniqBy from 'lodash.uniqby';
import { TemplateAction, TemplateActionTypes } from './actions';
import { Template } from './types';

export type TemplateReducerState = Template[] | null;

export default function reducer (state: TemplateReducerState = null, action: TemplateAction) {
  switch (action.type) {
    case TemplateActionTypes.GET_TEMPLATES_RESPONSE:
      const newTemplates = action.payload.templates;
      return uniqBy((state || []).concat(newTemplates), 'id');
    case TemplateActionTypes.CREATE_TEMPLATE_RESPONSE:
      return (state || []).concat(action.payload.template);
    case TemplateActionTypes.UPDATE_TEMPLATE_RESPONSE:
    case TemplateActionTypes.PATCH_TEMPLATE_RESPONSE:
      return state?.map(template => {
        if (template.id === action.payload.template.id) {
          return action.payload.template;
        }
        return template;
      });
    case TemplateActionTypes.DELETE_TEMPLATE_RESPONSE:
      return state?.filter(template => template.id !== action.payload.templateId);
    default:
      return state;
  }
}
