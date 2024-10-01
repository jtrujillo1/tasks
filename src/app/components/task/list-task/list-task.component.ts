import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Task } from 'src/app/core/interface/task.interface';
import { Store } from '@ngrx/store';
import {
  completeTask,
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
  tasksFilter: Task[] = [];
  selectedValue: string;
  listFilter: string[] = ['Todos', 'Completadas', 'Incompletas'];
  constructor(private readonly store: Store, private dialog: MatDialog) {
    this.selectedValue = 'Todos';
  }

  ngOnInit() {
    this.store.dispatch(loadTask());
    this.store.select(getTaskList).subscribe((task) => {
      this.tasks = task;
      this.tasksFilter = task;
    });
  }
  filter(item: string) {
    switch (item) {
      case 'Todos':
        this.tasksFilter = this.tasks;
        break;
      case 'Completadas':
        this.tasksFilter = this.tasks.filter((task) => task.completed == true);
        break;
      case 'Incompletas':
        this.tasksFilter = this.tasks.filter((task) => task.completed == false);
        break;
      default:
        break;
    }
  }

  completeTask(task: Task) {
    const _task: Task = {
      ...task,
      completed: true,
    };
    this.store.dispatch(completeTask({ inputData: _task }));
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
