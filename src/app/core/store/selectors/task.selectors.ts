import { createFeatureSelector, createSelector } from '@ngrx/store';

import { TaskModel } from '../../interface/task.interface';

const getTaskState = createFeatureSelector<TaskModel>('task');

export const getTaskList = createSelector(getTaskState, (state) => {
  return state.list;
});

export const getTask = createSelector(getTaskState, (state) => {
  return state.taskObj;
});
