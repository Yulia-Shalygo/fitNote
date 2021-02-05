import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { logOut } from 'src/app/auth/store/actions/auth.actions';

@Component({
  selector: 'app-create-abonement-page',
  templateUrl: './create-abonement-page.component.html',
  styleUrls: ['./create-abonement-page.component.css']
})
export class CreateAbonementPageComponent implements OnInit {

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
