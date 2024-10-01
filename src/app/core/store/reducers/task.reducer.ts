import {
  addTaskSuccess,
  completeTaskSuccess,
  getTaskSuccess,
  updateTaskSuccess,
} from './../actions/task.actions';
import { createReducer, on } from '@ngrx/store';
import { Task } from '../../interface/task.interface';
import { TaskState } from '../state/task.state';
import { loadTaskFail, loadTaskSuccess } from '../actions/task.actions';

const initialState: Task[] = [];

const _TaskReducer = createReducer(
  TaskState,
  on(loadTaskSuccess, (state, action) => {
    return {
      ...state,
      list: [...action.list],
      errorMessage: '',
    };
  }),
  on(loadTaskFail, (state, action) => {
    return {
      ...state,
      list: [],
      errorMessage: action.errorMessage,
    };
  }),
  on(getTaskSuccess, (state, action) => {
    return {
      ...state,
      taskObj: action.task,
      errorMessage: '',
    };
  }),
  on(addTaskSuccess, (state, action) => {
    const _maxId = Math.max(...state.list.map((task) => task.id));
    const _newTask = { ...action.inputData };
    _newTask.id = _maxId + 1;
    _newTask.completed = false;
    return {
      ...state,
      list: [...state.list, _newTask],
      errorMessage: '',
    };
  }),
  on(updateTaskSuccess, (state, action) => {
    const _newData = state.list.map((task) => {
      return task.id === action.inputData.id ? action.inputData : task;
    });
    return {
      ...state,
      list: _newData,
      errorMessage: '',
    };
  }),
  on(completeTaskSuccess, (state, action) => {
    const _newData = state.list.map((task) => {
      return task.id === action.inputData.id ? action.inputData : task;
    });
    return {
      ...state,
      list: _newData,
      errorMessage: '',
    };
  })
);

export function TaskReducer(state: any, action: any) {
  return _TaskReducer(state, action);
}
