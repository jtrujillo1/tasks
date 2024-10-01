import { Action, createAction, props } from '@ngrx/store';
import { Task } from '../../interface/task.interface';

export const LOAD_TASK = 'load task';
export const LOAD_TASK_SUCCESS = 'load task success';
export const LOAD_TASK_FAIL = 'load task fail';

export const ADD_TASK = 'add task';
export const ADD_TASK_SUCCESS = 'add task success';

export const GET_TASK = 'get task';
export const GET_TASK_SUCCESS = 'get task success';

export const UPDATE_TASK = 'update task';
export const UPDATE_TASK_SUCCESS = 'update task success';

export const COMPLETE_TASK = 'complete task';
export const COMPLETE_TASK_SUCCESS = 'complete task success';

export const loadTask = createAction(LOAD_TASK);
export const loadTaskSuccess = createAction(
  LOAD_TASK_SUCCESS,
  props<{ list: Task[] }>()
);
export const loadTaskFail = createAction(
  LOAD_TASK_FAIL,
  props<{ errorMessage: string }>()
);

export const addTask = createAction(ADD_TASK, props<{ inputData: Task }>());
export const addTaskSuccess = createAction(
  ADD_TASK_SUCCESS,
  props<{ inputData: Task }>()
);

export const getTask = createAction(GET_TASK, props<{ id: number }>());
export const getTaskSuccess = createAction(
  GET_TASK_SUCCESS,
  props<{ task: Task }>()
);

export const updateTask = createAction(
  UPDATE_TASK,
  props<{ inputData: Task }>()
);
export const updateTaskSuccess = createAction(
  UPDATE_TASK_SUCCESS,
  props<{ inputData: Task }>()
);

export const completeTask = createAction(
  COMPLETE_TASK,
  props<{ inputData: Task }>()
);
export const completeTaskSuccess = createAction(
  COMPLETE_TASK_SUCCESS,
  props<{ inputData: Task }>()
);
