import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { logOut } from 'src/app/auth/store/actions/auth.actions';

@Component({
  selector: 'app-exercise-by-body-header',
  templateUrl: './exercise-by-body-header.component.html',
  styleUrls: ['./exercise-by-body-header.component.css']
})
export class ExerciseByBodyHeaderComponent implements OnInit {

  constructor(
    private router: Router,
    private store: Store
  ) { }
  
  ngOnInit(): void {
  }

  logout(): void { 
    this.store.dispatch(logOut());
    this.router.navigate(['/login']);
  }
}
