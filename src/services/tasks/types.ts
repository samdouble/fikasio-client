export interface Task {
  id: string;
  dueAt: number;
  estimatedCompletionTime: number;
  projects: { id: string }[];
  taskId: string;
  type: string;
}
