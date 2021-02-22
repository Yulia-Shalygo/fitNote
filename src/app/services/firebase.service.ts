import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import { getAdminsSelector } from '../abonements/store/selectors/abonement.selectors';
import { User } from '../auth/store/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  userId: any;

  constructor(
    public fireAuth: AngularFireAuth, 
    private router: Router,
    private store: Store,
  ) { }

  async getUserById(userId: string): Promise<any> {
    const snapshot = await firebase.database().ref(`club/users/${ userId }`).once('value');
    return Object.values(snapshot.val() || {});
  }

  // TODO rename ref ???? get user
  async getAdmin(userUID: string): Promise<any> {
    const snapshot = await firebase.database().ref(`club/users/${ userUID }`).once('value');
    return Object.values(snapshot.val() || {});
  }

  async getAllUsers(): Promise<User[]> {
    const snapshot = await firebase.database().ref(`club/users`).once('value');
    return Object.values(snapshot.val() || {});
  }

  deleteUser(userId: string): void {
    // firebase.database().ref()
    // admin.auth().deleteUser(userId).then(() => console.log("delete ", userId)).catch((error) => console.log(error))
  }

  getAllAdmins() {
    let admins;

    this.store.select(getAdminsSelector).subscribe(adms => {
      console.log(admins);
      admins = adms;
    });
    return admins;
  }

  async isAdmin(userUID: string): Promise<string> {
    let role: string;
    await this.getAdmin(userUID).then((user) => {
      if (user.includes('admin')) {
        role = 'admin';
      } else if(user.includes('super')) {
        role = 'super';
      } else {
        role = 'client';
      }
    });
    return role;
  }

  createClient(user: User): Promise<any> {
    let config = {
      apiKey: "AIzaSyAHqE5p2InD3QOctLQ4zA__WwS0SbnQhXY",
      authDomain: "fitnote-ad140.firebaseapp.com",
      databaseURL: "https://fitnote-ad140-default-rtdb.firebaseio.com"
    };
    let secondaryApp = firebase.initializeApp(config, "Secondary");

    return secondaryApp.auth().createUserWithEmailAndPassword(user.email, 'qwerty').then(function(newUser) {
      firebase.database().ref(`club/users/${newUser.user.uid}`).update({...user, userId: newUser.user.uid}); // .set(user);

      secondaryApp.auth().signOut();
      secondaryApp.delete();
      
      return newUser.user.uid;
    }).then((userId) => this.router.navigate([`/abonement/create-abonement/${userId}`]))
      .catch(error => {
        secondaryApp.delete();
        this.router.errorHandler(error);
    });
  }

  createAdmin(user: User) {
    let config = {
      apiKey: "AIzaSyAHqE5p2InD3QOctLQ4zA__WwS0SbnQhXY",
      authDomain: "fitnote-ad140.firebaseapp.com",
      databaseURL: "https://fitnote-ad140-default-rtdb.firebaseio.com"
    };
    let secondaryApp = firebase.initializeApp(config, "Secondary");

    return secondaryApp.auth().createUserWithEmailAndPassword(user.email, 'qwerty').then(function(newAdmin) {
      firebase.database().ref(`club/users/${newAdmin.user.uid}`).update({...user, userId: newAdmin.user.uid});
      secondaryApp.auth().signOut();
      secondaryApp.delete();
    }).then(() => this.router.navigate(['/admin-page'])).catch(error => {
      secondaryApp.delete();
      this.router.errorHandler(error);
    });
  }
  
  createTrainer(user: User) {
    let config = {
      apiKey: "AIzaSyAHqE5p2InD3QOctLQ4zA__WwS0SbnQhXY",
      authDomain: "fitnote-ad140.firebaseapp.com",
      databaseURL: "https://fitnote-ad140-default-rtdb.firebaseio.com"
    };
    let secondaryApp = firebase.initializeApp(config, "Secondary");

    return secondaryApp.auth().createUserWithEmailAndPassword(user.email, 'qwerty').then(function(newAdmin) {
      firebase.database().ref(`club/users/${newAdmin.user.uid}`).update({...user, userId: newAdmin.user.uid});
      secondaryApp.auth().signOut();
      secondaryApp.delete();
    }).then(() => this.router.navigate([`/admin-page/trainers`]))
    .catch(error => {
      secondaryApp.delete();
      this.router.errorHandler(error);
    });
  }

  async signin(email: string, password: string): Promise<string> {
    await this.fireAuth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
      return this.fireAuth.signInWithEmailAndPassword(email, password).then(() => {        
        this.userId = firebase.auth().currentUser.uid;
        this.isAdmin(this.userId).then(admin => {  
          switch (admin) {
            case 'admin': {
              this.router.navigate(['/abonement']);
              break;
            }
            case 'super': {
              this.router.navigate(['/admin-page']);
              break;
            }
            case 'client': {
              this.router.navigate(['/diary']);
              break;
            }
          }
        });
      })
    });
    return this.userId;
  }

  logout(): any {
    return firebase.auth().signOut();
  }

  getUser(): string {
    return firebase.auth().currentUser.uid;
  }
}
