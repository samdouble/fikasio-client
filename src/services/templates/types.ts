export interface TemplateField {
  id: string;
  isRequired: boolean;
  name: string;
  type: string;
}

export interface Template {
  id: string;
  fields: TemplateField[];
  name: string;
}
