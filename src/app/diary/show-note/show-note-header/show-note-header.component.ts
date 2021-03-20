import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { logOut } from 'src/app/auth/store/actions/auth.actions';

@Component({
  selector: 'app-show-note-header',
  templateUrl: './show-note-header.component.html',
  styleUrls: ['./show-note-header.component.css']
})
export class ShowNoteHeaderComponent implements OnInit {

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
