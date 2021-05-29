import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { getUser } from 'src/app/auth/store/actions/auth.actions';
import { getBodies, getExercises } from 'src/app/diary/store/actions/diary.actions';
import { Exercise } from 'src/app/diary/store/models/exercise.model';
import { getExercisesSelector } from 'src/app/diary/store/selectors/diary.selectors';

@Component({
  selector: 'app-exercise-by-body',

  template: `
    <app-exercises-body-header></app-exercises-body-header>
    <div class="section">
        <div class="table">
            <app-exercise-by-body-table></app-exercise-by-body-table>
        </div>
    </div>
  `,

  styleUrls: ['./exercise-by-body.component.css']
})
export class ExerciseByBodyComponent implements OnInit {

  exercises: Exercise[];

  constructor(
    private activationRoute: ActivatedRoute,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.store.dispatch(getUser());
    this.store.dispatch(getBodies());
    this.store.dispatch(getExercises());

    this.activationRoute.params.subscribe(bodyId => {
      this.store.select(getExercisesSelector).subscribe(exercises => {
        this.exercises = exercises.filter(exercise => exercise.body == bodyId.id);
      });
    });
  }

}
