import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  userId: any;

  constructor(public fireAuth: AngularFireAuth) { }

  async getUserById(userId: string): Promise<any> {
    const snapshot = await firebase.database().ref(`club/users/${ userId }`).once('value');
    return Object.values(snapshot.val() || {});
  }

  getUser(): string {
    return firebase.auth().currentUser.uid;
  }

  getUserEmail(): string {
    return firebase.auth().currentUser.email;
  }

  async getUserName(): Promise<any> {
    let userId = firebase.auth().currentUser.uid;
    const snapshot = await firebase.database().ref(`club/users/${ userId }`).once('value');
    return snapshot.val().name;
  }

  async getUserPhone(): Promise<any> {
    let userId = firebase.auth().currentUser.uid;
    const snapshot = await firebase.database().ref(`club/users/${ userId }`).once('value');
    return snapshot.val().phone;
  }

  updatePassword() {
    let email = firebase.auth().currentUser.email;
    firebase.auth().sendPasswordResetEmail(email).catch(error => console.log(error));
  }
  
}
