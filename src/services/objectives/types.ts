export interface Objective {
  dueDate: string | null;
  id: string;
  isArchived: boolean;
  name: string;
  projects: { id: string; }[]
}
