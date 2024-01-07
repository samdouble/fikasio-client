import { Dispatch } from 'redux';
import {
  getTasks as APIgetTasks,
  createTask as APIcreateTask,
  updateTask as APIupdateTask,
  patchTask as APIpatchTask,
  deleteTask as APIdeleteTask,
  deleteManyTasks as APIdeleteManyTasks,
} from './endpoints';
import { fetchOnceOperation } from '../fetchOperation';
import {
  getTasksRequest,
  getTasksResponse,
  createTaskRequest,
  createTaskResponse,
  updateTaskRequest,
  updateTaskResponse,
  patchTaskRequest,
  patchTaskResponse,
  deleteTaskRequest,
  deleteTaskResponse,
  deleteManyTasksRequest,
  deleteManyTasksResponse,
  TaskAction,
} from './actions';
import { Task } from './types';

type TaskDispatch = Dispatch<TaskAction>;

const fetchTasks = (filter = {}) => {
  return fetchOnceOperation(
    getTasksRequest,
    getTasksResponse,
    APIgetTasks,
    state => state.tasks,
    [filter],
  );
};

const createTask = (task: Partial<Task>) => {
  return (dispatch: TaskDispatch) => {
    dispatch(createTaskRequest(task));
    return APIcreateTask(task)
      .then(res => {
        dispatch(createTaskResponse({ ...res }));
        return res.task;
      })
  };
};

const updateTask = (id: string, task: Task) => {
  return (dispatch: TaskDispatch) => {
    dispatch(updateTaskRequest(id, task));
    return APIupdateTask(id, task)
      .then(res => dispatch(updateTaskResponse({ ...res })));
  };
};

const patchTask = (id: string, task: Partial<Task>) => {
  return (dispatch: TaskDispatch) => {
    dispatch(patchTaskRequest(id, task));
    return APIpatchTask(id, task)
      .then(res => dispatch(patchTaskResponse({ ...res })));
  };
};

const deleteTask = (id: string) => {
  return (dispatch: TaskDispatch) => {
    dispatch(deleteTaskRequest(id));
    return APIdeleteTask(id)
      .then(res => dispatch(deleteTaskResponse({ ...res })));
  };
};

const deleteManyTasks = (ids: string[]) => {
  return (dispatch: TaskDispatch) => {
    dispatch(deleteManyTasksRequest(ids));
    return APIdeleteManyTasks(ids)
      .then(res => dispatch(deleteManyTasksResponse({ ...res })));
  };
};

const operations = {
  fetchTasks,
  createTask,
  updateTask,
  patchTask,
  deleteTask,
  deleteManyTasks,
};

export default operations;
