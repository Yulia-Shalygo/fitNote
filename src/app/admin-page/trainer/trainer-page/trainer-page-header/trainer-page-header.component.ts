import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { logOut } from 'src/app/auth/store/actions/auth.actions';

@Component({
  selector: 'app-trainer-page-header',
  templateUrl: './trainer-page-header.component.html',
  styleUrls: ['./trainer-page-header.component.css']
})
export class TrainerPageHeaderComponent implements OnInit {

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
