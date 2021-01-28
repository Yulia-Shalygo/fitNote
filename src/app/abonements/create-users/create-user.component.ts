import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/auth/store/models/user.model';
import { ErrorService } from 'src/app/services/error.service';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  userForm: FormGroup;
  err: string = '';
  trainer: boolean = false;

  constructor(
    private firebaseService: FirebaseService,
    private router: Router,
    private errorService: ErrorService
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
      comment: new FormControl(null,
        [Validators.required])
    })
  }

  createUser(): void {

    const {name, email, birth, phone, comment} = this.userForm.value;

    let user: User = {
      name, email, birth, phone, comment, isAdmin: false
    };
    this.userForm.disable();

    this.firebaseService.createUser(email, 'qwerty', user, null).then(() =>
      this.router.navigate(['/abonement'])
    ).catch((errorCode) => {
      this.userForm.reset();
      this.userForm.enable();

      this.err = this.errorService.getErrorString(errorCode.code);
    })
  }
}
