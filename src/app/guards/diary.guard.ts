import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FirebaseService } from '../services/firebase.service';

@Injectable({
  providedIn: 'root'
})
export class DiaryGuard implements CanActivate {

  constructor(private router: Router) {}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // TODO
    
    return true;
    // let user = localStorage.getItem("admin");
    // console.log(user)
    // if(user === "false") { // admin
    //   return true;
    // } else {
    //   this.router.navigate(['diary']);
    // }
  }
  
}
