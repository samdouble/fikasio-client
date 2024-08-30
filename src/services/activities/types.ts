export interface Value {
  fieldId: string;
  value: any;
}

export interface Activity {
  comments: string;
  duration: number;
  endTime: Date;
  id: string;
  name?: string;
  projects?: { id: string; }[];
  startTime: Date;
  tasks?: { id: string; }[];
  templateId?: string;
  values?: Value[];
}
