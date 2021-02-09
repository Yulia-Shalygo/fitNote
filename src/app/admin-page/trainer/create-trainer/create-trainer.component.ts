import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { User } from 'src/app/auth/store/models/user.model';
import { AdminService } from 'src/app/services/admin.service';
import { ErrorService } from 'src/app/services/error.service';
import { createTrainer, getTrainers } from '../../store/actions/admin-page.actions';
import { getAdminErrors, getTrainerById } from '../../store/selectors/admin-page.selectors';

@Component({
  selector: 'app-create-trainer',
  templateUrl: './create-trainer.component.html',
  styleUrls: ['./create-trainer.component.css']
})
export class CreateTrainerComponent implements OnInit {
  
  userForm: FormGroup;
  err: string = '';

  subscription: Subscription;
  
  trainerId: string;
  trainer: User = {
    email: null
  };

  constructor(
    private store: Store,
    private errorService: ErrorService,
    private activationRoute: ActivatedRoute,
    private adminService: AdminService,
    private cd: ChangeDetectorRef
  ) { }

  ngAfterViewInit() {
    this.cd.detectChanges();
  }

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

    this.store.dispatch(getTrainers());

    this.activationRoute.params.subscribe(trainerId => this.trainerId = trainerId.id);
    this.store.select(getTrainerById(this.trainerId)).subscribe(trainer => {
      if (trainer) {
        this.trainer.name = trainer.name;
        this.trainer.email = trainer.email;
        this.trainer.birth = trainer.birth;
        this.trainer.phone = trainer.phone;
        this.trainer.comment = trainer.comment;
        this.trainer.workExperience = trainer.workExperience;
        this.trainer.education = trainer.education;
      } else {
        this.trainer.name = '';
        this.trainer.email = '';
        this.trainer.birth = '';
        this.trainer.phone = '';
        this.trainer.comment = '';
        this.trainer.workExperience = '';
        this.trainer.education = '';
      }
    });
  }

  createTrainer(): void {
    const {name, email, birth, phone, comment, workExperience, education} = this.userForm.value;

    let trainer: User = {
      name, email, birth, phone, comment, workExperience, education, role: 'trainer', userId: this.trainerId
    };

    this.activationRoute.params.subscribe(trainerId => {
      if (trainerId.id != undefined) {
        this.adminService.updateTrainer(trainer, trainerId.id);
      } else {
        this.userForm.disable();
        this.store.dispatch(createTrainer({ trainer }));

        this.subscription = this.store.pipe(select(getAdminErrors)).subscribe(errorCode => {
          if(errorCode) {
            this.err = this.errorService.getErrorString(errorCode);
            this.userForm.enable();
          }
        });
      }
    });
  }
}
