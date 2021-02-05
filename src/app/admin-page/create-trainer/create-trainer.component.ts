import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { User } from 'src/app/auth/store/models/user.model';
import { ErrorService } from 'src/app/services/error.service';
import { createTrainer } from '../store/actions/admin-page.actions';
import { getAdminErrors } from '../store/selectors/admin-page.selectors';

@Component({
  selector: 'app-create-trainer',
  templateUrl: './create-trainer.component.html',
  styleUrls: ['./create-trainer.component.css']
})
export class CreateTrainerComponent implements OnInit {
  
  userForm: FormGroup;
  err: string = '';

  subscription: Subscription;
  
  constructor(
    private store: Store,
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
      comment: new FormControl(null),
      workExperience: new FormControl(null),
      education: new FormControl(null, Validators.required)
    });
  }

  createTrainer(): void {
    const {name, email, birth, phone, comment, workExperience, education} = this.userForm.value;

    let trainer: User = {
      name, email, birth, phone, comment, workExperience, education, role: 'trainer'
    };
    this.userForm.disable();
    this.store.dispatch(createTrainer({ trainer }));

    this.subscription = this.store.pipe(select(getAdminErrors)).subscribe(errorCode => {
      if(errorCode) {
        this.err = this.errorService.getErrorString(errorCode);
        this.userForm.enable();
      }
    });
  }

}
