import { Task } from './types';

export enum TaskActionTypes {
  CREATE_TASK_REQUEST = 'CREATE_TASK_REQUEST',
  CREATE_TASK_RESPONSE = 'CREATE_TASK_RESPONSE',
  GET_TASKS_REQUEST = 'GET_TASKS_REQUEST',
  GET_TASKS_RESPONSE = 'GET_TASKS_RESPONSE',
  UPDATE_TASK_REQUEST = 'UPDATE_TASK_REQUEST',
  UPDATE_TASK_RESPONSE = 'UPDATE_TASK_RESPONSE',
  PATCH_TASK_REQUEST = 'PATCH_TASK_REQUEST',
  PATCH_TASK_RESPONSE = 'PATCH_TASK_RESPONSE',
  PATCH_MANY_TASKS_REQUEST = 'PATCH_MANY_TASKS_REQUEST',
  PATCH_MANY_TASKS_RESPONSE = 'PATCH_MANY_TASKS_RESPONSE',
  DELETE_TASK_REQUEST = 'DELETE_TASK_REQUEST',
  DELETE_TASK_RESPONSE = 'DELETE_TASK_RESPONSE',
  DELETE_MANY_TASKS_REQUEST = 'DELETE_MANY_TASKS_REQUEST',
  DELETE_MANY_TASKS_RESPONSE = 'DELETE_MANY_TASKS_RESPONSE',
}

export type TaskAction =
  | { type: TaskActionTypes.CREATE_TASK_REQUEST; payload: { task: Partial<Task> } }
  | { type: TaskActionTypes.CREATE_TASK_RESPONSE; payload: { task: Task } }
  | { type: TaskActionTypes.GET_TASKS_REQUEST; payload: { tasks: Task[] } }
  | { type: TaskActionTypes.GET_TASKS_RESPONSE; payload: { tasks: Task[] } }
  | { type: TaskActionTypes.UPDATE_TASK_REQUEST; payload: { id: string; task: Task } }
  | { type: TaskActionTypes.UPDATE_TASK_RESPONSE; payload: { task: Task } }
  | { type: TaskActionTypes.PATCH_TASK_REQUEST; payload: { id: string; task: Partial<Task> } }
  | { type: TaskActionTypes.PATCH_TASK_RESPONSE; payload: { task: Task } }
  | { type: TaskActionTypes.PATCH_MANY_TASKS_REQUEST; payload: { ids: string[]; infos: Partial<Task> } }
  | { type: TaskActionTypes.PATCH_MANY_TASKS_RESPONSE; payload: { tasks: Task[] } }
  | { type: TaskActionTypes.DELETE_TASK_REQUEST; payload: { taskId: string } }
  | { type: TaskActionTypes.DELETE_TASK_RESPONSE; payload: { taskId: string } }
  | { type: TaskActionTypes.DELETE_MANY_TASKS_REQUEST; payload: { tasksIds: string[] } }
  | { type: TaskActionTypes.DELETE_MANY_TASKS_RESPONSE; payload: { tasksIds: string[] } };

export const createTaskRequest = (task: Partial<Task>): TaskAction => ({
  type: TaskActionTypes.CREATE_TASK_REQUEST,
  payload: { task },
});

export const createTaskResponse = (payload: { task: Task }): TaskAction => ({
  type: TaskActionTypes.CREATE_TASK_RESPONSE,
  payload,
});

export const getTasksRequest = (payload: { tasks: Task[] }): TaskAction => ({
  type: TaskActionTypes.GET_TASKS_REQUEST,
  payload,
});

export const getTasksResponse = (payload: { tasks: Task[] }): TaskAction => ({
  type: TaskActionTypes.GET_TASKS_RESPONSE,
  payload,
});

export const updateTaskRequest = (id: string, task: Task): TaskAction => ({
  type: TaskActionTypes.UPDATE_TASK_REQUEST,
  payload: { id, task },
});

export const updateTaskResponse = (payload: { task: Task }): TaskAction => ({
  type: TaskActionTypes.UPDATE_TASK_RESPONSE,
  payload,
});

export const patchTaskRequest = (id: string, task: Partial<Task>): TaskAction => ({
  type: TaskActionTypes.PATCH_TASK_REQUEST,
  payload: { id, task },
});

export const patchTaskResponse = (payload: { task: Task }): TaskAction => ({
  type: TaskActionTypes.PATCH_TASK_RESPONSE,
  payload,
});

export const patchManyTasksRequest = (ids: string[], infos: Partial<Task>): TaskAction => ({
  type: TaskActionTypes.PATCH_MANY_TASKS_REQUEST,
  payload: { ids, infos },
});

export const patchManyTasksResponse = (payload: { tasks: Task[] }): TaskAction => ({
  type: TaskActionTypes.PATCH_MANY_TASKS_RESPONSE,
  payload,
});

export const deleteTaskRequest = (taskId: string): TaskAction => ({
  type: TaskActionTypes.DELETE_TASK_REQUEST,
  payload: { taskId },
});

export const deleteTaskResponse = (payload: { taskId: string }): TaskAction => ({
  type: TaskActionTypes.DELETE_TASK_RESPONSE,
  payload,
});

export const deleteManyTasksRequest = (tasksIds: string[]): TaskAction => ({
  type: TaskActionTypes.DELETE_MANY_TASKS_REQUEST,
  payload: { tasksIds },
});

export const deleteManyTasksResponse = (payload: { tasksIds: string[] }): TaskAction => ({
  type: TaskActionTypes.DELETE_MANY_TASKS_RESPONSE,
  payload,
});
