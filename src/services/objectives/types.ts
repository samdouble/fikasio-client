export interface Objective {
  id: string;
  isArchived: boolean;
  projects: { id: string; }[]
}
