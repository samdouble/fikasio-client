import uniqBy from 'lodash.uniqby';
import { TemplateAction, TemplateActionTypes } from './actions';
import { Template } from './types';

export default function reducer (state: Template[] | null = null, action: TemplateAction) {
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

    case TemplateActionTypes.CREATE_TEMPLATE_FIELD_RESPONSE:
      return state?.map(template => {
        if (template.id === action.payload.templateId) {
          return {
            ...template,
            fields: [
              ...template.fields,
              action.payload.field,
            ],
          };
        }
        return template;
      });
    case TemplateActionTypes.UPDATE_TEMPLATE_FIELD_RESPONSE:
    case TemplateActionTypes.PATCH_TEMPLATE_FIELD_RESPONSE:
      return state?.map(template => {
        if (template.id === action.payload.templateId) {
          return {
            ...template,
            fields: template.fields?.map(field => {
              if (field.id === action.payload.field.id) {
                return action.payload.field;
              }
              return field;
            }),
          };
        }
        return template;
      });
    case TemplateActionTypes.DELETE_TEMPLATE_FIELD_RESPONSE:
      return state?.map(template => {
        if (template.id === action.payload.templateId) {
          return {
            ...template,
            fields: template.fields?.filter(field => (
              field.id !== action.payload.fieldId
            )),
          };
        }
        return template;
      });
    default:
      return state;
  }
}
