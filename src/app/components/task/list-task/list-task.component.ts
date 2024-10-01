import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Task } from 'src/app/core/interface/task.interface';
import { Store } from '@ngrx/store';
import {
  getTask,
  loadTask,
  updateTask,
} from 'src/app/core/store/actions/task.actions';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddTaskComponent } from '../add-task/add-task.component';
import { getTaskList } from 'src/app/core/store/selectors/task.selectors';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-list-task',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatCheckboxModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
  ],
  templateUrl: './list-task.component.html',
  styleUrls: ['./list-task.component.scss'],
})
export class ListTaskComponent {
  // Definimos el observable:
  tasks: Task[] = [];
  selectedValue: string;
  listFilter: string[] = ['Todos', 'Completadas', 'Incompletas'];
  constructor(private readonly store: Store, private dialog: MatDialog) {
    this.selectedValue = 'Todos';
  }

  ngOnInit() {
    this.store.dispatch(loadTask());
    this.store.select(getTaskList).subscribe((task) => {
      this.tasks = task;
    });
  }

  completeTask(task: Task) {
    console.log(task);
    // this.store.dispatch(updateTask({ inputData: task }));
  }

  addTask() {
    this.dialog
      .open(AddTaskComponent, {
        data: { title: 'Agregar nueva' },
        height: '95%',
      })
      .afterClosed();
  }

  editTask(task: Task) {
    this.store.dispatch(getTask({ id: task.id }));
    this.dialog
      .open(AddTaskComponent, {
        height: '95%',
        data: { code: task.id, title: 'Actualizar' },
      })
      .afterClosed();
  }
}
