import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { getUsers } from '../abonements/store/actions/abonement.actions';
import { Shape } from '../abonements/store/models/shape.model';
import { User } from '../auth/store/models/user.model';
import { Abonement } from '../abonements/store/models/abonement.model';

@Injectable({
  providedIn: 'root'
})
export class AbonementService {

  costOfDay: number = 5;

  constructor(
    private router: Router,
    private store: Store
  ) { }

  createAbonement(abonement: any) {
    return firebase.database().ref(`club/users/${abonement.userId}/abonement`).set(abonement)
      .then(() => {
        this.store.dispatch(getUsers());
        // this.router.navigate(['/abonement'])
      })
      .catch(error => this.router.errorHandler(error));
  }

  getCost(days: number): number {
    return this.costOfDay * days;
  }

  changeDays(abonement: Abonement) {
    let day = abonement.days.valueOf() - 1
    // console.log(abonement.days.valueOf() - 1)
    // console.log(abonement)
    firebase.database().ref(`club/users/${abonement.userId}/abonement`).update({...abonement, days: day});
  }
  async getAllFormOfAbonement(): Promise<Shape[]> {
    const snapshot = await firebase.database().ref(`club/abonement-form`).once('value');
    return Object.values(snapshot.val() || {});
  }
  
}
