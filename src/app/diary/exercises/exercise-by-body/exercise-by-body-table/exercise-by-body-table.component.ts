import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { getUser } from 'src/app/auth/store/actions/auth.actions';
import { getBodies, getExercises } from 'src/app/diary/store/actions/diary.actions';
import { Exercise } from 'src/app/diary/store/models/exercise.model';
import { getExercisesSelector } from 'src/app/diary/store/selectors/diary.selectors';

@Component({
  selector: 'app-exercise-by-body-table',
  templateUrl: './exercise-by-body-table.component.html',
  styleUrls: ['./exercise-by-body-table.component.css']
})
export class ExerciseByBodyTableComponent implements OnInit {

  exercises: Exercise[];
  needExercises: Exercise[];

  private _searchSubject: Subject<string> = new Subject();
  
  constructor(
    private store: Store,
    private activationRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.store.dispatch(getUser());
    this.store.dispatch(getBodies());
    this.store.dispatch(getExercises());

    this.activationRoute.params.subscribe(bodyId => {
      this.store.select(getExercisesSelector).subscribe(exercises => {
        if (exercises) {
          let temp = exercises.filter(exercise => exercise.body == bodyId.id);
          this.needExercises = temp;
          this.exercises = temp;
        } else this.exercises = [];
      })
    });
  }

  public updateSearch(searchTextValue: string): any {
    if (!searchTextValue) {
      this.needExercises = this.exercises;
    }
    if (!this.exercises) {
      this.needExercises = [];
    }
    searchTextValue = searchTextValue.toLocaleLowerCase();

    this._searchSubject.next(searchTextValue);
    this.needExercises = this.exercises.filter(exercise => exercise.name.toLocaleLowerCase().includes(searchTextValue));
  }

}
