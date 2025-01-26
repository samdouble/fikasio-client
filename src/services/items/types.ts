export interface Value {
  fieldId: string;
  value: any;
}

export interface Item {
  entityId: string;
  id: string;
  values: Value[];
}
