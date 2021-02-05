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
export class AbonementGuard implements CanActivate {

  constructor(
    private router: Router,
    private firebaseService: FirebaseService,
  ) {}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    let userId = firebase.auth().currentUser.uid;
    this.firebaseService.isAdmin(userId).then(admin => { 
      switch (admin) {
        case 'admin': {
          return false;
        }
        case 'super': {
          return true;
        }
        case 'client': {
          return false;
        }
      }
    });
    
    return false;
  }
}
