import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import { User } from '../interfaces/user';
import { map } from 'rxjs/operators';
import { DataSnapshot } from '@angular/fire/database/interfaces';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  error: string;
  user: User;
  public currentUser: any;

  admin: boolean;
  static url = 'https://fitnote-ad140-default-rtdb.firebaseio.com/users';

  constructor(
    public fireAuth: AngularFireAuth, 
    private router: Router,
    private http: HttpClient
  ) { }

  async getUser(userUID: string) {
    const snapshot = await firebase.database().ref(`users/${ userUID }`).once('value');
    return Object.values(snapshot.val() || {});
  }

  async isAdmin(userUID: string): Promise<boolean> {
    let admin: boolean;

   await this.getUser(userUID).then((user) => {
      if (user[1]) {
        admin = true;
      } else {
        admin = false;
      }
    })
    return admin;
  }

  async signin(email: string, password: string): Promise<void> {
    return this.fireAuth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
      return this.fireAuth.signInWithEmailAndPassword(email, password).then(res => {
        
        // TODO: if user = admin 

        
        let userId = firebase.auth().currentUser.uid;

        // this.user = {
        //   email,
        //   isAdmin: false
        // }

        // firebase.database().ref(`users/${userId}`).set(this.user);

        this.isAdmin(userId).then(admin => {  
          console.log(admin);        
          if (admin) {
            console.log("admin")
            this.router.navigate(['/abonement']);
          } else {
            this.router.navigate(['/calendar']);
          }
        });

        
        // // console.log(this.getUser(userId));

        // firebase.database().ref(`users/${userId}`).set(this.user);

        // this.router.navigate(['/calendar']);
      }).catch((error) => {
        this.error = error;
        console.log(error);
        this.router.errorHandler(error);
      });
    }).catch((error) => {
      this.error = error;
      console.log(error);
      this.router.errorHandler(error);
    });
  }

  async register(email: string, password: string): Promise<void> {
    await this.fireAuth.createUserWithEmailAndPassword(email, password).then(res => {
      this.router.navigate(['/calendar']);
    }).catch((error) => {
      this.error = error;
      console.log(error);
      this.router.errorHandler(error);
    });
  } 

  logout(): void {
    firebase.auth().signOut().catch((error) => {
      console.log(error);
    });
  }
}
