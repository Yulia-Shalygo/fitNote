import { Injectable } from '@angular/core';
import { Exercise } from '../interfaces/exercise';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class ExercisesService {

  constructor() { }

  createExercise(exercise: Exercise): void {
    firebase.database().ref(`exercises/${exercise.body}/${exercise.id}`).set(exercise).catch(error => {
      console.log(error);
    });
  }
}