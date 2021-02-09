import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { User } from 'src/app/auth/store/models/user.model';
import { ErrorService } from 'src/app/services/error.service';
import { createAdmin, getAdmins } from '../../store/actions/admin-page.actions';
import { getAdminById, getAdminErrors } from '../../store/selectors/admin-page.selectors';
import { AngularFireStorage } from '@angular/fire/storage';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

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

  update = false;
  
  adminId: string;
  admin: User = {
    email: null
  };

  constructor(
    private store: Store,
    private errorService: ErrorService,
    private fireStorage: AngularFireStorage,
    private activationRoute: ActivatedRoute,
    private adminService: AdminService,
    private cd: ChangeDetectorRef
  ) { }

  ngAfterViewInit() {
    this.cd.detectChanges();
  }

  ngOnInit(): void {
    this.adminForm = new FormGroup({
      name: new FormControl(null, 
        [Validators.required]),
      email: new FormControl(null, 
        [Validators.required, 
          Validators.email]),
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
    });

    this.store.dispatch(getAdmins());

    this.activationRoute.params.subscribe(adminId => this.adminId = adminId.id);
    this.store.select(getAdminById(this.adminId)).subscribe(admin => {
      if (admin) {
        this.admin.name = admin.name;
        this.admin.email = admin.email;
        this.admin.birth = admin.birth;
        this.admin.phone = admin.phone;
        this.admin.address = admin.address;
        this.admin.workSchedule = admin.workSchedule;
        this.admin.workExperience = admin.workExperience;
        this.admin.education = admin.education;
        this.admin.comment = admin.comment;
        this.admin.image = admin.image;
        this.url = admin.image;
      } else {
        this.admin.name = '';
        this.admin.email = '';
        this.admin.birth = '';
        this.admin.phone = '';
        this.admin.address = '';
        this.admin.workSchedule = '';
        this.admin.workExperience = '';
        this.admin.education = '';
        this.admin.comment = '';
        this.admin.image = '';
      }
    });
  }

  createAdmin(): void {
    const { name, email, birth, phone, comment, workExperience, education, address, workSchedule } = this.adminForm.value;

    let admin: User = {
      name, email, birth, phone, comment, workExperience, education, address, workSchedule, role: 'admin', image: this.url, userId: this.adminId
    };

    this.activationRoute.params.subscribe(adminId => {
      if (adminId.id != undefined) {
        this.update = true;

        this.adminService.updateAdmin(admin, adminId.id);
      } else {
        if (this.fileName && this.file) {
          this.fireStorage.upload(this.fileName, this.file)
          .then(rst => { 
            rst.ref.getDownloadURL().then(url => this.url = url);
          });
        };

        this.adminForm.disable();
        this.store.dispatch(createAdmin({ admin }));

        this.subscription = this.store.pipe(select(getAdminErrors)).subscribe(errorCode => {
          if(errorCode) {
            this.err = this.errorService.getErrorString(errorCode);
            this.adminForm.enable();
          } else {
            this.adminForm.reset();
          }
        });   
      }
    }); 
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
