export interface Project {
  color?: string;
  dueAt: Date | null;
  id: string;
  isArchived: boolean;
  name: string;
  startAt: Date | null;
}
