import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Task } from 'src/app/core/interface/task.interface';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_NATIVE_DATE_FORMATS,
  MatNativeDateModule,
  NativeDateAdapter,
} from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { addTask, updateTask } from 'src/app/core/store/actions/task.actions';
import { MatDividerModule } from '@angular/material/divider';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { getTask } from 'src/app/core/store/selectors/task.selectors';

@Component({
  selector: 'app-add-task',
  standalone: true,
  providers: [
    { provide: DateAdapter, useClass: NativeDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MAT_NATIVE_DATE_FORMATS },
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
  ],
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent {
  formTask!: FormGroup;
  formPerson!: FormGroup;
  dateInit: Date = new Date();
  constructor(
    private store: Store,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<AddTaskComponent>
  ) {
    this.createForm();
  }

  ngOnInit() {}

  createForm() {
    if (this.data.code)
      this.store.select(getTask).subscribe((task) => {
        this.formTask = this.fb.group({
          id: [task.id],
          name: [task.name, Validators.required],
          date: [task.date, Validators.required],
          persons: this.fb.array(
            task.persons.map((person) => {
              return this.fb.group({
                name: [
                  person.name,
                  [Validators.required, Validators.minLength(5)],
                ],
                age: [
                  person.age,
                  [
                    Validators.required,
                    Validators.min(18),
                    Validators.pattern('^[0-9,$]*$'),
                  ],
                ],
                skills: this.fb.array(
                  person.skills.map((skill) => {
                    return this.fb.group({
                      name: [skill.name, Validators.required],
                    });
                  })
                ),
              });
            })
          ),
        });
      });
    else {
      const skill = this.fb.group({
        name: ['', Validators.required],
      });

      this.formPerson = this.fb.group({
        name: ['', [Validators.required, Validators.minLength(5)]],
        age: [
          '',
          [
            Validators.required,
            Validators.min(18),
            Validators.pattern('^[0-9,$]*$'),
          ],
        ],
        skills: this.fb.array([skill]),
      });
      this.formTask = this.fb.group({
        name: ['', Validators.required],
        date: [new Date().toISOString(), Validators.required],
        persons: this.fb.array([this.formPerson]),
      });
    }
  }

  close() {
    this.ref.close();
  }

  addTask() {
    if (this.formTask.invalid) return;
    const _task: Task = {
      ...this.formTask.getRawValue(),
    };
    if (_task.id && _task.id !== 0) {
      this.store.dispatch(updateTask({ inputData: _task }));
    } else {
      this.store.dispatch(addTask({ inputData: _task }));
    }

    this.close();
  }

  get person() {
    return this.formTask.get('persons') as FormArray;
  }

  personSkill(personIndex: number): FormArray {
    return this.person.at(personIndex).get('skills') as FormArray;
  }

  addPerson() {
    const skill = this.fb.group({
      name: ['', Validators.required],
    });

    const personForm = this.fb.group({
      name: ['', Validators.required],
      age: [
        '',
        [
          Validators.required,
          Validators.min(18),
          Validators.pattern('^[0-9,$]*$'),
        ],
      ],
      skills: this.fb.array([skill]),
    });

    this.person.push(personForm);
  }

  addSkill(personIndex: number) {
    const skill = this.fb.group({
      name: ['', Validators.required],
    });

    this.personSkill(personIndex).push(skill);
  }

  deletePerson(personIndex: number) {
    this.person.removeAt(personIndex);
  }

  deleteSkill(personIndex: number, skillIndex: number) {
    this.personSkill(personIndex).removeAt(skillIndex);
  }

  isValidFieldInArray(formArray: FormArray, i: number) {
    return formArray.controls[i].errors && formArray.controls[i].touched;
  }

  getFieldError(formArray: FormArray, i: number): string | null {
    if (!formArray) return null;

    const errors = formArray.controls[i].errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';
        case 'min':
          return 'Debe tener 18 o mas años';
        case 'minLength':
          return 'Debe contener masde 5 caracteres';
        default:
          return null;
      }
    }
    return null;
  }
}
