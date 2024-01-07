import { TaskAction, TaskActionTypes } from './actions';
import { Task } from './types';

export default function reducer(state: Task[] | null = null, action: TaskAction) {
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
    case TaskActionTypes.DELETE_MANY_TASKS_RESPONSE:
      return state?.filter(task => (
        !task.id
        || !action.payload.tasksIds.includes(task.id)
      ));
    default:
      return state;
  }
}
