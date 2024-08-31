export interface Value {
  fieldId: string;
  value: any;
}

export interface Activity {
  comments: string;
  createdAt: string;
  duration: number;
  endTime: string;
  id: string;
  name?: string;
  projects?: { id: string; }[];
  startTime: string;
  tasks?: { id: string; }[];
  templateId?: string;
  values?: Value[];
}
