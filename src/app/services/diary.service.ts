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

  constructor(private router: Router) { }

  async getBodies(): Promise<Body[]> {
    const snapshot = await firebase.database().ref(`club/exercises`).once('value');
    return Object.values(snapshot.val() || {});
  }

  async getExercises(): Promise<Exercise[]> {
    const snapshot = await firebase.database().ref(`club/exercises_all`).once('value');
    return Object.values(snapshot.val() || {});
  }

  createNote(note: Note, date: string, exerciseId: number): any {
    note.date = date;
    let userId = firebase.auth().currentUser.uid;
    return firebase.database().ref(`club/users/${userId}/diary/${date}/${exerciseId}`).set(note)
      .catch(error => this.router.errorHandler(error));
  }

  updateNote(note: Note, exerId: number): void {
    let userId = firebase.auth().currentUser.uid;
    firebase.database().ref(`club/users/${userId}/diary/${note.date}/${exerId}`).update({...note});
  }

  async getAllNotesByDate(date: string): Promise<Note[]> {
    let userId = firebase.auth().currentUser.uid;
    const snapshot = await firebase.database().ref(`club/users/${userId}/diary/${date}`).once('value');
    return Object.values(snapshot.val() || {});
  }

  async getAllNotes(): Promise<Note[]> {
    let userId = firebase.auth().currentUser.uid;
    const snapshot = await firebase.database().ref(`club/users/${userId}`).once('value');
    return Object.values(snapshot.val() || {});
  }

  async removeNote(note: Note): Promise<any> {
    let userId = firebase.auth().currentUser.uid;
    return firebase.database().ref(`club/users/${userId}/diary/${note.date}/${note.exercise.id}`).remove();
  }

}
