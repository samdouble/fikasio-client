export interface EntityField {
  id: string;
  isRequired: boolean;
  name: string;
  type: string;
}

export interface Entity {
  fields: EntityField[];
  id: string;
  name: string;
}
