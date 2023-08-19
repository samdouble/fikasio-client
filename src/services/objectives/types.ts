export interface Objective {
  dueDate: string;
  id: string;
  isArchived: boolean;
  name: string;
  projects: { id: string; }[]
}
