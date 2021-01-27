import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/interfaces/user';
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

  users: User[];
  
  constructor(
    private firebaseService: FirebaseService,
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

    this.firebaseService.getAllUsers().then(res => {
      this.users = res;
    }); // all clients
  }

  getCost(days: number): number {
    return this.abonementService.getCost(days);
  }
}
