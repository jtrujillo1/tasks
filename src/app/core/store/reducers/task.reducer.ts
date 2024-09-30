import { createReducer, on } from '@ngrx/store';
import { Task } from '../../interface/task.interface';
import * as TaskActions from '../actions/task.actions';

const initialState: Task[] = [];

// export const guestsReducer = createReducer(
//   initialState,
//   on(TaskActions.loadTask, (tasks) => tasks),
//   on(TaskActions.createTask, (state, { tasks }) => [...state, tasks]),
//   on(TaskActions.updateTask, (state, { task }) =>
//     state.map((t) => (t.id === task.id ? { ...t, ...task } : t))
//   ),
//   on(TaskActions.deleteTask, (state, { id }) =>
//     state.filter((t) => t.id !== id)
//   )
// );
