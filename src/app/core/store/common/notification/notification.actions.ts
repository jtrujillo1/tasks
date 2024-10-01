import { createAction, props } from '@ngrx/store';

export const SHOW_ALERT = 'show alert';
export const EMPTY_ACTION = 'empty';

export const showAlert = createAction(
  SHOW_ALERT,
  props<{ message: string; resultType: string }>()
);
export const emptyAction = createAction(EMPTY_ACTION);
