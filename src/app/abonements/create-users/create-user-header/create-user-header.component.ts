import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { logOut } from 'src/app/auth/store/actions/auth.actions';

@Component({
  selector: 'app-create-user-header',
  templateUrl: './create-user-header.component.html',
  styleUrls: ['./create-user-header.component.css']
})
export class CreateUserHeaderComponent implements OnInit {

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
