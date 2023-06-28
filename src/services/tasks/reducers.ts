import { TaskAction, TaskActionTypes } from './actions';
import { Task } from './types';

export type TaskReducerState = Task[] | null;

export default function reducer(state: TaskReducerState = null, action: TaskAction) {
  switch (action.type) {
    case TaskActionTypes.GET_TASKS_RESPONSE:
      return action.payload.tasks;
    case TaskActionTypes.CREATE_TASK_RESPONSE:
      if (action.payload.task.type === 'Instance') {
        return state?.map(task => {
          if (
            task.taskId === action.payload.task.taskId
            && task.dueAt === action.payload.task.dueAt
          ) {
            return action.payload.task;
          }
          return task;
        });
      }
      return (state || []).concat(action.payload.task);
    case TaskActionTypes.UPDATE_TASK_RESPONSE:
    case TaskActionTypes.PATCH_TASK_RESPONSE:
      return state?.map(task => {
        if (task.id === action.payload.task.id) {
          return action.payload.task;
        }
        return task;
      });
    case TaskActionTypes.DELETE_TASK_RESPONSE:
      return state?.filter(task => (task.id !== action.payload.taskId));
    default:
      return state;
  }
}
