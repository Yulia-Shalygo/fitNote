import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { User } from 'src/app/auth/store/models/user.model';
import { ErrorService } from 'src/app/services/error.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { createClient, getUsers } from '../store/actions/abonement.actions';
import { getAbonementError } from '../store/selectors/abonement.selectors';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  userForm: FormGroup;
  err: string = '';
  trainer: boolean = false;

  subscription: Subscription;

  constructor(
    private firebaseService: FirebaseService,
    private router: Router,
    private errorService: ErrorService,
    private store: Store,
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

    this.store.dispatch(createClient({ user }));

    this.subscription = this.store.pipe(select(getAbonementError)).subscribe(errorCode => {
      if(errorCode){
        this.err = this.errorService.getErrorString(errorCode);
        this.userForm.enable();
      }
    });
  }
}
