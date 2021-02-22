import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { logOut } from 'src/app/auth/store/actions/auth.actions';

@Component({
  selector: 'app-create-diary-header',
  templateUrl: './create-diary-header.component.html',
  styleUrls: ['./create-diary-header.component.css']
})
export class CreateDiaryHeaderComponent implements OnInit {

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
