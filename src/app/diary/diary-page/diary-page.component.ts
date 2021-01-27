import { Component, OnInit } from '@angular/core';
import { Exercise } from 'src/app/interfaces/exercise';
import { ExercisesService } from 'src/app/services/exercises.service';

@Component({
  selector: 'app-diary-page',
  templateUrl: './diary-page.component.html',
  styleUrls: ['./diary-page.component.css']
})
export class DiaryPageComponent implements OnInit {

  constructor(
    private exercisesService: ExercisesService,
  ) { }

  ngOnInit(): void {
    // let exercise: Exercise= {
    //   body: 'breast',
    //   name: 'Жим штанги, лежа на прямой скамье',
    //   comment: 'jkjkjk',
    //   complexity: 3
    // };
    // this.exercisesService.createExercise(exercise);
  }

}
