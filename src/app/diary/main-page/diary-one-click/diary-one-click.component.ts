import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { getBodies, getExercises } from '../../store/actions/diary.actions';
import { Exercise } from '../../store/models/exercise.model';
import { getBodiesSelector, getExercisesSelector } from '../../store/selectors/diary.selectors';

import {FormBuilder, Validators} from '@angular/forms';
import { getUser } from 'src/app/auth/store/actions/auth.actions';


@Component({
  selector: 'app-diary-one-click',
  templateUrl: './diary-one-click.component.html',
  styleUrls: ['./diary-one-click.component.css']
})
export class DiaryOneClickComponent implements OnInit {
  range: FormGroup;
  
  bodies: Body[] = [];
  diaryForm: FormGroup;

  exercisesByBody: Exercise[] = [];

  panelOpenState = false;
  
  allExercises: Exercise[] = [];
  selectedExercises: Set<Exercise> = new Set();
  currExercises: any;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  date: string;

  exercises: any;

  constructor(
    private store: Store,
    private _formBuilder: FormBuilder
  ) { }  

  ngOnInit(): void {

    this.range = new FormGroup({
      start: new FormControl(null,)
    });

    this.firstFormGroup = this._formBuilder.group({
      date: ['', Validators.required], 
    });
    this.secondFormGroup = this._formBuilder.group({
      // secondCtrl: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      items: new FormArray([]),
    });

    this.diaryForm = new FormGroup({
      bodies: new FormControl(null,)
    });
    this.store.dispatch(getUser());
    this.store.dispatch(getExercises());
    this.store.dispatch(getBodies());

    this.store.select(getExercisesSelector).subscribe(exercises => {
      this.allExercises = exercises;
      const groupByBody = this.groupBy("body");
      this.exercises = groupByBody(exercises);
    });

    this.store.select(getBodiesSelector).subscribe(bodies => this.bodies = bodies);
  }

  get form() {
    return this.thirdFormGroup.controls;
  }
  get items() {
    return this.form.items as FormArray;
  }

  showData(): void {
    console.log("showData")
    const numberOfExercises = this.currExercises.length;
    if (this.items.length < numberOfExercises) {
      for (let i = this.items.length; i < numberOfExercises; i++) {
        this.items.push(this._formBuilder.group({
          exercise: [this.currExercises[i]],
          exerciseName: [this.currExercises[i].name],

          firstRepeated: ['', Validators.required],
          firstWeigth: [''],

          secondRepeated: [''],
          secondWeigth: [''],

          thirdRepeated: [''],
          thirdWeigth: [''],

          fourthRepeated: [''],
          fourthWeigth: [''],

          fifthRepeated: [''],
          fifthWeigth: ['']
        }));
      }
    } else {
      for (let i = this.items.length; i >= numberOfExercises; i--) {
        this.items.removeAt(i);
      }
    }
  }
  
  submit(): void {
    console.log(JSON.stringify(this.thirdFormGroup.value, null, 4));
  }
  getDate(date: any) {

    this.date = date;
    console.log(date)
  }

  groupBy(key: any): any {
    return function group(array: any) {
      return array.reduce((acc: any, obj: any) => {
        const property = obj[key];
        acc[property] = acc[property] || [];
        acc[property].push(obj);
        return acc;
      }, {});
    };
  }
  
  getExercises(bodyId: any): any {
    this.exercisesByBody = this.exercises[bodyId];
  }

  toArray(item: Exercise) {
    if (this.selectedExercises.has(item)) { 
      this.selectedExercises.delete(item);
    } else {
      this.selectedExercises.add(item);
    }
    this.currExercises = [...this.selectedExercises];
  }

  deleteAll(): any {
    this.selectedExercises.clear();
    this.currExercises = [];
  }
}
