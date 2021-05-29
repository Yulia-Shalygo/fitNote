import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { logOut } from 'src/app/auth/store/actions/auth.actions';

@Component({
  selector: 'app-exercises-body-header',
  templateUrl: './exercises-body-header.component.html',
  styleUrls: ['../../../../../styles/header.css']
})
export class ExercisesBodyHeaderComponent {
  
  constructor(
    private router: Router,
    private store: Store
  ) { }

  logout(): void { 
    this.store.dispatch(logOut());
    this.router.navigate(['/login']);
  }
}
