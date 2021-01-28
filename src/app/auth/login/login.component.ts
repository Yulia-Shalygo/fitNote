import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorService } from 'src/app/services/error.service';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  err: string = '';
  userId: any;

  constructor(
    public firebaseServiсe: FirebaseService,
    private errorService: ErrorService

  ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, 
        [Validators.required, Validators.email]),
      password: new FormControl(null, 
        [Validators.minLength(6), Validators.required])
    })
  }

  async signin(email: string, password: string): Promise<void> {
    this.loginForm.disable();

    await this.firebaseServiсe.signin(email, password)
      .catch((errorCode) => {     
        this.loginForm.reset();
        this.loginForm.enable();
        this.err = this.errorService.getErrorString(errorCode.code);
      })
  }
}
