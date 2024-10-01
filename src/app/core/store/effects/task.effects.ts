import {
  loadTaskFail,
  loadTaskSuccess,
  addTask,
  addTaskSuccess,
  getTask,
  getTaskSuccess,
  updateTask,
  updateTaskSuccess,
  completeTask,
} from './../actions/task.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TaskService } from 'src/app/services/task.service';
import { loadTask } from '../actions/task.actions';
import { catchError, exhaustMap, map, of, switchMap } from 'rxjs';
import { Injectable } from '@angular/core';
import { showAlert } from '../common/notification/notification.actions';

@Injectable()
export class TaskEffects {
  constructor(private action$: Actions, private taskService: TaskService) {}

  _loadTask = createEffect(() =>
    this.action$.pipe(
      ofType(loadTask),
      exhaustMap((action) => {
        return this.taskService.getTasks().pipe(
          map((task) => {
            return loadTaskSuccess({ list: task });
          }),
          catchError((_error) =>
            of(loadTaskFail({ errorMessage: _error.message }))
          )
        );
      })
    )
  );

  _getTask = createEffect(() =>
    this.action$.pipe(
      ofType(getTask),
      exhaustMap((action) => {
        return this.taskService.getTaskById(action.id).pipe(
          map((task) => {
            return getTaskSuccess({ task: task });
          }),
          catchError((_error) =>
            of(
              showAlert({
                message: 'Falló al cargar la información' + _error.message,
                resultType: 'fail',
              })
            )
          )
        );
      })
    )
  );

  _addTask = createEffect(() =>
    this.action$.pipe(
      ofType(addTask),
      switchMap((action) => {
        return this.taskService.createTask(action.inputData).pipe(
          switchMap((task) => {
            return of(
              addTaskSuccess({ inputData: action.inputData }),
              showAlert({
                message: 'Tarea creada satisfactoriamente.',
                resultType: 'pass',
              })
            );
          }),
          catchError((_error) =>
            of(
              showAlert({
                message: 'Falló al crear una nueva tarea',
                resultType: 'fail',
              })
            )
          )
        );
      })
    )
  );

  _updateTask = createEffect(() =>
    this.action$.pipe(
      ofType(updateTask),
      switchMap((action) => {
        return this.taskService.updateTask(action.inputData).pipe(
          switchMap((task) => {
            return of(
              updateTaskSuccess({ inputData: action.inputData }),
              showAlert({
                message: 'Tarea actualizada satisfactoriamente.',
                resultType: 'pass',
              })
            );
          }),
          catchError((_error) =>
            of(
              showAlert({
                message: 'Falló al actualizar tarea',
                resultType: 'fail',
              })
            )
          )
        );
      })
    )
  );

  _completeTask = createEffect(() =>
    this.action$.pipe(
      ofType(completeTask),
      switchMap((action) => {
        return this.taskService.completeTask(action.inputData).pipe(
          switchMap((task) => {
            return of(
              updateTaskSuccess({ inputData: action.inputData }),
              showAlert({
                message: 'Tarea actualizada satisfactoriamente.',
                resultType: 'pass',
              })
            );
          }),
          catchError((_error) =>
            of(
              showAlert({
                message: 'Falló al actualizar tarea',
                resultType: 'fail',
              })
            )
          )
        );
      })
    )
  );
}
