import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { logOut } from 'src/app/auth/store/actions/auth.actions';

@Component({
  selector: 'app-calendar-header',
  templateUrl: './calendar-header.component.html',
  styleUrls: ['./calendar-header.component.css']
})
export class CalendarHeaderComponent implements OnInit {

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
