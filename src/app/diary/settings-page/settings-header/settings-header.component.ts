import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { logOut } from 'src/app/auth/store/actions/auth.actions';

@Component({
  selector: 'app-settings-header',
  templateUrl: './settings-header.component.html',
  styleUrls: ['../../../styles/header.css']
})
export class SettingsHeaderComponent {

  constructor(
    private router: Router,
    private store: Store
  ) { }

  logout(): void { 
    this.store.dispatch(logOut());
    this.router.navigate(['/login']);
  }

}
