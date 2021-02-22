import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import { Exercise } from '../diary/store/models/exercise.model';
import { Note } from '../diary/store/models/note.model';

@Injectable({
  providedIn: 'root'
})
export class DiaryService {

  constructor(
    private router: Router,
  ) { }

  async getBodies(): Promise<Body[]> {
    const snapshot = await firebase.database().ref(`club/exercises`).once('value');
    return Object.values(snapshot.val() || {});
  }

  async getExercises(): Promise<Exercise[]> {
    const snapshot = await firebase.database().ref(`club/exercises_all`).once('value');
    return Object.values(snapshot.val() || {});
  }

  createNote(note: Note): any {
    let userId = firebase.auth().currentUser.uid; // ????????????? set(note) path
    return firebase.database().ref(`club/users/${userId}/diary/${note.date}/${note.exerciseId}`).set(note).catch(error => this.router.errorHandler(error));
  }
}
