export interface Task {
  id?: string;
  assignee?: string;
  description: string;
  dueAt?: Date | null;
  estimatedCompletionTime?: number;
  isArchived?: boolean;
  projects?: { id: string; }[];
  startAt?: Date | null;
  status?: 'Doing' | 'Blocked' | 'Completed';
  taskId?: string;
  type: string;
}
