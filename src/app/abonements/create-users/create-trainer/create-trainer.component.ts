import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/auth/store/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-create-trainer',
  templateUrl: './create-trainer.component.html',
  styleUrls: ['./create-trainer.component.css']
})
export class CreateTrainerComponent implements OnInit {
  
  userForm: FormGroup;
  err = false;

  constructor(
    private firebaseService: FirebaseService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userForm = new FormGroup({
      name: new FormControl(null, 
        [Validators.required]),
      email: new FormControl(null, 
        [Validators.required, Validators.email]),
      birth: new FormControl(null,
        [Validators.required]),
      phone: new FormControl(null,
        [Validators.required]),
      comment: new FormControl(null),
      workExperience: new FormControl(null),
      education: new FormControl(null, Validators.required)
    })
  }

  createTrainer(): void {

    const {name, email, birth, phone, comment, workExperience, education} = this.userForm.value;

    let user: User = {
      name, email, birth, phone, comment, isAdmin: false, workExperience, education
    };
    this.userForm.disable();
    this.firebaseService.createUser(email, 'qwerty', user, 'trainer').then(() =>
      this.router.navigate(['/abonement'])
    ).catch(() => {
      this.userForm.reset();
      this.userForm.enable();
      this.err = true;
    })
  }

}
