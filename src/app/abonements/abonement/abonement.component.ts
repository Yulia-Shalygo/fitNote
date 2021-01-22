import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import  firebase from 'firebase/app';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-abonement',
  templateUrl: './abonement.component.html',
  styleUrls: ['./abonement.component.css']
})
export class AbonementComponent implements OnInit {

  userUID: string;
  error: any;
  
  constructor(
    private firebaseService: FirebaseService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // try {
    //   this.userUID = firebase.auth().currentUser.uid; 
    //   console.log("uid - ", this.userUID)
    // } catch(error){
    //   this.error = error;
    // };
  }

  logout(): void {
    this.firebaseService.logout();
    this.router.navigate(['/login']);
  }

}
