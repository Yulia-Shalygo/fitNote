import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FirebaseService } from '../services/firebase.service';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

    userId: any;

    constructor(
        private router: Router,
        private firebaseService: FirebaseService,
    ) {
        this.userId = firebase.auth().currentUser;
    }
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    if (this.userId != null) {
        return new Promise((resolve) => {
            this.firebaseService.getUserById(this.userId.uid).then(user => {
                this.userId = firebase.auth().currentUser;
                if (user.includes('super')) {
                    resolve(true);
                } else {
                    this.router.navigate(['/not-found']);
                    resolve(false);
                }
            })
        });
    } else return false;
  }
}
