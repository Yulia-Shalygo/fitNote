import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AbonementService } from 'src/app/services/abonement.service';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-create-abonement-form',
  templateUrl: './create-abonement-form.component.html',
  styleUrls: ['./create-abonement-form.component.css']
})
export class CreateAbonementFormComponent implements OnInit {

  abonementForm: FormGroup;
  err = false;
  cost: number;

  constructor(
    private firebaseService: FirebaseService,
    private router: Router,
    private abonementService: AbonementService,
  ) { }

  ngOnInit(): void {
    this.abonementForm = new FormGroup({
      user: new FormControl(null),
      dateOfStart: new FormControl(null,
        Validators.required),
      dateOfEnd: new FormControl(null,
        Validators.required),
      numberDays: new FormControl(null,
        Validators.required),
      cost: new FormControl(null)
    });
  }

  getCost(days: number): number {
    return this.abonementService.getCost(days);
  }


}
