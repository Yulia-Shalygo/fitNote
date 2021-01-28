import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-create-admin',
  templateUrl: './create-admin.component.html',
  styleUrls: ['./create-admin.component.css']
})
export class CreateAdminComponent implements OnInit {

  adminForm: FormGroup;
  err = false;

  url: string = "/assets/img/user.png"
  
  constructor(
    private firebaseService: FirebaseService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.adminForm = new FormGroup({
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
      education: new FormControl(null, Validators.required),
      address: new FormControl(null, [Validators.required]),
      workSchedule: new FormControl(null),

      imageUrl: new FormControl(null)
    })
  }

  createAdmin(): void {
    const {name, email, birth, phone, comment, workExperience, education, address, workSchedule} = this.adminForm.value;

    let user: User = {
      name, email, birth, phone, comment, isAdmin: false, workExperience, education, address, workSchedule
    };
    this.adminForm.disable();
    this.firebaseService.createUser(email, 'qwerty', user, 'admin').then(() =>
      this.router.navigate(['/abonement'])
    ).catch(() => {
      this.adminForm.reset();
      this.adminForm.enable();
      this.err = true;
    })
  }

  onFileSelected(event): void {
    if (event.target.files) {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.url = event.target.result; 
      }
    }
  }

}
