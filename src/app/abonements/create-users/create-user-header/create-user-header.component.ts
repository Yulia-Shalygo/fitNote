import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-create-user-header',
  templateUrl: './create-user-header.component.html',
  styleUrls: ['./create-user-header.component.css']
})
export class CreateUserHeaderComponent implements OnInit {

  constructor(
    private firebaseService: FirebaseService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.firebaseService.logout();
    this.router.navigate(['/login']);
  }

}
