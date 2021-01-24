import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-create-abonement-page',
  templateUrl: './create-abonement-page.component.html',
  styleUrls: ['./create-abonement-page.component.css']
})
export class CreateAbonementPageComponent implements OnInit {

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
