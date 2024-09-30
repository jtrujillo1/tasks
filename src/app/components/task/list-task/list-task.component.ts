import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Task } from 'src/app/core/interface/task.interface';
import { Store } from '@ngrx/store';
import { loadTask } from 'src/app/core/store/actions/task.actions';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddTaskComponent } from '../add-task/add-task.component';

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
  ],
  templateUrl: './list-task.component.html',
  styleUrls: ['./list-task.component.scss'],
})
export class ListTaskComponent {
  // Definimos el observable:
  tasks: Task[];
  selectedValue: string;
  listFilter: string[] = ['Todos', 'Completadas', 'Incompletas'];
  constructor(private readonly store: Store, private dialog: MatDialog) {
    this.selectedValue = 'Todos';
    this.tasks = [
      {
        id: 1,
        name: 'Preparar almuerzo',
        date: new Date(),
        completed: false,
        persons: [
          {
            age: 28,
            name: 'john',
            skills: ['Cheft creativo'],
          },
          {
            age: 28,
            name: 'nhela',
            skills: ['Cheft experta'],
          },
        ],
      },
      {
        id: 2,
        name: 'Preparar cena',
        date: new Date(),
        completed: false,
        persons: [
          {
            age: 28,
            name: 'nhela',
            skills: ['Cheft experta'],
          },
          {
            age: 28,
            name: 'john',
            skills: ['Cheft creativo'],
          },
        ],
      },
    ];
  }

  ngOnInit() {
    // Accedemos a la store:
    // this.store.dispatch(
    //   loadTask({
    //     task: [
    //       {
    //         id: 1,
    //         name: 'Preparar almuerzo',
    //         date: new Date(),
    //         completed: false,
    //         persons: [
    //           {
    //             edad: 28,
    //             name: 'john',
    //             skills: ['Cheft creativo'],
    //           },
    //         ],
    //       },
    //     ],
    //   })
    // );
  }

  addTask() {
    this.dialog.open(AddTaskComponent).afterClosed();
  }
}
