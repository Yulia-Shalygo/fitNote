import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import  firebase from 'firebase/app';
import { FirebaseService } from '../services/firebase.service';
import { logOut } from './store/actions/auth.actions';

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
    private firebaseService: FirebaseService,
    private store: Store
  ) { }

  ngOnInit(): void {
    try {
      this.userUID = firebase.auth().currentUser.uid; 
    } catch(error){
      this.error = error;
    };
  }

  logout(): void { 
    this.store.dispatch(logOut());
    this.router.navigate(['/login']);
  }

}
