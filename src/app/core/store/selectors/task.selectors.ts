import { createSelector } from '@ngrx/store';
import { AppState } from '../../app.state';

export const selectAllTask = (state: AppState) => state.tasks;

export const selectGuests = createSelector(selectAllTask, (task) => task);
