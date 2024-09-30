import { Action, createAction, props } from '@ngrx/store';
import { Task } from '../../interface/task.interface';

export const createTask = createAction(
  'create Task',
  props<{ tasks: Task[] }>()
);

export const loadTask = createAction('load Task');

export const updateTask = createAction('update Task', props<{ task: Task }>());

export const deleteTask = createAction('Delete task', props<{ id: number }>());
