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
  projects: { id: string; }[];
  startTime: number;
  tasks: { id: string; }[];
  templateId: string;
  values: Value[];
}
