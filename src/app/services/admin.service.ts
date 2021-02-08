import { Injectable } from '@angular/core';
import { User } from '../auth/store/models/user.model';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor() { }

  updateAdmin(admin: User, adminId: any) {
    return firebase.database().ref(`club/users/${adminId}`).set(admin);
  }
}
