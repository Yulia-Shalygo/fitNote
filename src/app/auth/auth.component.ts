import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import  firebase from 'firebase/app';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  userUID: string = null;
  error: any;

  constructor(
    private router: Router,
    private firebaseService: FirebaseService
  ) { }

  ngOnInit(): void {
    try {
      this.userUID = firebase.auth().currentUser.uid; 
    } catch(error){
      this.error = error;
    };

    // this.firebaseService.isAdmin(firebase.auth().currentUser.uid).then(isAdmin => {console.log(isAdmin)})
  }

  logout(): void { 
    this.firebaseService.logout();
    this.router.navigate(['/login']);
  }

}
