import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { User } from 'src/app/auth/store/models/user.model';
import { ErrorService } from 'src/app/services/error.service';
import { createAdmin } from '../store/actions/admin-page.actions';
import { getAdminErrors } from '../store/selectors/admin-page.selectors';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-create-admin',
  templateUrl: './create-admin.component.html',
  styleUrls: ['./create-admin.component.css']
})
export class CreateAdminComponent implements OnInit {

  adminForm: FormGroup;
  err: string = '';

  url: string = '/assets/img/user.png';
  subscription: Subscription;

  file: any;
  fileName: any;
  
  constructor(
    private store: Store,
    private errorService: ErrorService,
    private fireStorage: AngularFireStorage,
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
    const { name, email, birth, phone, comment, workExperience, education, address, workSchedule } = this.adminForm.value;

    let admin: User = {
      name, email, birth, phone, comment, workExperience, education, address, workSchedule, role: 'admin', image: this.fileName
    };
    if (this.fileName && this.file) {
      this.fireStorage.upload(this.fileName, this.file);
    }

    this.adminForm.disable();
    this.store.dispatch(createAdmin({ admin }));
  
    this.subscription = this.store.pipe(select(getAdminErrors)).subscribe(errorCode => {
      if(errorCode) {
        this.err = this.errorService.getErrorString(errorCode);
        this.adminForm.enable();
      } else {
        this.adminForm.reset();
        // this.url = '/assets/img/user.png';
      }
    });   
    
    // this.router.navigate(['/admin-page']);
  }

  onFileSelected(event): void {
    this.file = event.target.files[0];
    this.fileName = this.file.name;

    if (event.target.files) {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.url = event.target.result; 
      }
    }
  }

}
