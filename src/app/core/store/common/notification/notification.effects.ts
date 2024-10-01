import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { showAlert, emptyAction } from './notification.actions';
import { exhaustMap, map } from 'rxjs';

@Injectable()
export class notificationEffects {
  constructor(private $action: Actions, private _snackBar: MatSnackBar) {}

  _showNotification = createEffect(() =>
    this.$action.pipe(
      ofType(showAlert),
      exhaustMap((action) => {
        return this.showNotification(action.message, action.resultType)
          .afterDismissed()
          .pipe(
            map(() => {
              return emptyAction();
            })
          );
      })
    )
  );

  showNotification(message: string, resultType: string = 'fail') {
    let _class = resultType == 'pass' ? 'green-snackbar' : 'red-snackbar';
    return this._snackBar.open(message, 'OK', {
      verticalPosition: 'bottom',
      horizontalPosition: 'center',
      panelClass: [_class],
    });
  }
}
