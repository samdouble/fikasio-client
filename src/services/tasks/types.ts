export interface Task {
  id: string;
  description: string;
  dueAt: number | null;
  estimatedCompletionTime: number;
  isArchived: boolean;
  isCompleted: boolean;
  projects: { id: string }[];
  taskId: string;
  type: string;
}
