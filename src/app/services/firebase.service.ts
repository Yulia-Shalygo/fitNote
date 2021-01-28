import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import { User } from '../auth/store/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  error: string;
  userId: any;
  public currentUser: any;

  admin: boolean;
  static url = 'https://fitnote-ad140-default-rtdb.firebaseio.com/users';

  constructor(
    public fireAuth: AngularFireAuth, 
    private router: Router,
  ) { }

  async getAdmin(userUID: string) {
    const snapshot = await firebase.database().ref(`users/admins/${ userUID }`).once('value');
    return Object.values(snapshot.val() || {});
  }

  async getAllUsers(): Promise<User[]> {
    const snapshot = await firebase.database().ref(`users/clients`).once('value');
    return Object.values(snapshot.val() || {});
  }

  async isAdmin(userUID: string): Promise<boolean> {
    let admin: boolean;

   await this.getAdmin(userUID).then((user) => {
      if (user.length != 0) {
        admin = true;
        localStorage.setItem("admin", "true");
      } else {
        admin = false;
        localStorage.setItem("admin", "false");
      }
    })
    return admin;
  }

  createUser(email: string, password: string, user: User, trainer: string): Promise<void> {   
    return firebase.auth().createUserWithEmailAndPassword(email, password).then(function () {
      let userUID = firebase.auth().currentUser.uid;

      if (trainer === null) {
        firebase.database().ref(`users/clients/${userUID}`).set(user);
      } else if (trainer === 'trainer') {
        firebase.database().ref(`users/trainers/${userUID}`).set(user);
      } else {
        user.isAdmin = true;
        firebase.database().ref(`users/admins/${userUID}`).set(user);
      }
    })
  }

  async signin(email: string, password: string): Promise<string> {
    await this.fireAuth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
      return this.fireAuth.signInWithEmailAndPassword(email, password).then(() => {        
        this.userId = firebase.auth().currentUser.uid;

        this.isAdmin(this.userId).then(admin => {  
          if (admin) {
            this.router.navigate(['/abonement']);
          } else {
            this.router.navigate(['/diary']);
          }
        });
      })
    });
    return this.userId;
  }

  logout(): any {
    localStorage.setItem("admin", "guest");

    return firebase.auth().signOut();
  }

  getUser(): string {
    return firebase.auth().currentUser.uid;
  }
}
