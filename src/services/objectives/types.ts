export interface Objective {
  id: string;
  isArchived: boolean;
  name: string;
  projects: { id: string; }[]
}
