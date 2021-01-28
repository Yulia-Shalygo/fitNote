import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { logOut } from 'src/app/auth/store/actions/auth.actions';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-abonement',
  templateUrl: './abonement.component.html',
  styleUrls: ['./abonement.component.css']
})
export class AbonementComponent implements OnInit {
  
  constructor(
    private firebaseService: FirebaseService,
    private router: Router,
    private store: Store
  ) { }

  ngOnInit(): void { }

  logout(): void {
    this.store.dispatch(logOut())
    this.router.navigate(['/login']);
  }

}
