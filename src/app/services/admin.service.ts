import { Injectable } from '@angular/core';
import { User } from '../auth/store/models/user.model';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private router: Router) { }

  updateAdmin(admin: User, adminId: any) {
    return firebase.database().ref(`club/users/${adminId}`).set(admin).then(() => this.router.navigate(['/admin-page']));
  }

  updateTrainer(trainer: User, trainerId: any) {
    return firebase.database().ref(`club/users/${trainerId}`).set(trainer).then(() => this.router.navigate(['/admin-page/trainers']));
  }
}
