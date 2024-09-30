import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Task } from 'src/app/core/interface/task.interface';
import * as TaskActions from './../../../core/store/actions/task.actions';
import {
  FormArray,
  FormBuilder,
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
  ],
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent {
  formTask!: FormGroup;
  formPerson!: FormGroup;
  dateInit: Date = new Date();
  constructor(private store: Store, private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {}

  createForm() {
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
      skill: this.fb.array([skill]),
    });
    this.formTask = this.fb.group({
      name: ['', Validators.required],
      date: [new Date().toISOString(), Validators.required],
      person: this.fb.array([this.formPerson]),
    });
    console.log(this.formTask);
  }

  get person() {
    return this.formTask.get('person') as FormArray;
  }

  get skill() {
    return this.formPerson.get('skill') as FormArray;
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
      skill: this.fb.array([skill]),
    });

    this.person.push(personForm);
  }

  addSkill() {
    const skill = this.fb.group({
      name: ['', Validators.required],
    });
    this.skill.push(skill);
  }

  deletePerson(personIndex: number) {
    this.person.removeAt(personIndex);
  }

  deleteSkill(skillIndex: number) {
    this.person.removeAt(skillIndex);
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
          return 'Debe ser mayor de edad';
        default:
          return null;
      }
    }
    return null;
  }
}
