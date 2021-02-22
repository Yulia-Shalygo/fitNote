import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { getUser } from 'src/app/auth/store/actions/auth.actions';
import { getBodies, getExercises } from 'src/app/diary/store/actions/diary.actions';
import { Exercise } from 'src/app/diary/store/models/exercise.model';
import { getExercisesByBodyId, getExercisesSelector } from 'src/app/diary/store/selectors/diary.selectors';

@Component({
  selector: 'app-exercise-by-body',
  templateUrl: './exercise-by-body.component.html',
  styleUrls: ['./exercise-by-body.component.css']
})
export class ExerciseByBodyComponent implements OnInit {

  bodyId: number;
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
      this.bodyId = bodyId.id;
      this.store.select(getExercisesSelector).subscribe(exercises => {
        this.exercises = exercises.filter(exercise => exercise.body == bodyId.id);

      })
      // this.store.select(getExercisesByBodyId(bodyId.id)).subscribe(body => console.log(body));
    });
  }

}
