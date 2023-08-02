export interface Value {
  fieldId: string;
  value: any;
}

export interface Activity {
  comments: string;
  duration: number;
  endTime: string;
  id: string;
  name: string;
  startTime: number;
  templateId: string;
  values: Value[];
}
