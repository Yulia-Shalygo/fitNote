import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { logOut } from 'src/app/auth/store/actions/auth.actions';

@Component({
  selector: 'app-create-trainer-header',
  templateUrl: './create-trainer-header.component.html',
  styleUrls: ['./create-trainer-header.component.css']
})
export class CreateTrainerHeaderComponent implements OnInit {

  constructor(
    private store: Store,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.store.dispatch(logOut());
    this.router.navigate(['/login']);
  }

}
