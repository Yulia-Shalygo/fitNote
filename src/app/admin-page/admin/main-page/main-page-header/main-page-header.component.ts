import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { logOut } from 'src/app/auth/store/actions/auth.actions';

@Component({
  selector: 'app-main-page-header',
  templateUrl: './main-page-header.component.html',
  styleUrls: ['../../../../styles/header.css']
})
export class MainPageHeaderComponent implements OnInit {

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
