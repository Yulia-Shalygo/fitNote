import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getUser } from 'src/app/auth/store/actions/auth.actions';
import { DiaryService } from 'src/app/services/diary.service';
import { getBodies, getExercises } from '../../store/actions/diary.actions';
import { getBodiesSelector } from '../../store/selectors/diary.selectors';

@Component({
  selector: 'app-exercise-body',
  templateUrl: './exercise-body.component.html',
  styleUrls: ['./exercise-body.component.css']
})
export class ExerciseBodyComponent implements OnInit {

  bodies: Body[] = [];

  constructor(
    private store: Store,
    private diaryService: DiaryService
  ) { }

  ngOnInit(): void {
    this.store.dispatch(getUser());
    this.store.dispatch(getBodies());
    this.store.dispatch(getExercises());

    this.diaryService.getBodies().then(bodies => this.bodies = bodies);
  }

}
