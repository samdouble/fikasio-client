export interface Event {
  createdAt: Date;
  eventType: string;
  id: string;
  modifiedAt: Date;
  type: string;
}

export interface ObjectiveProgressEvent extends Event {
  progress: number;
}
