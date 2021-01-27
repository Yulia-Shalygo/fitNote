import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FirebaseService } from '../services/firebase.service';
import { TaskService } from '../services/task.service';
import { AbonementComponent } from './abonement/abonement.component';
import { AbonementPageMRoutingModule } from './abonement-routing.module';
import { CalendarComponent } from '../calend/calendar/calendar.component';
import { CalendarPageComponent } from '../calend/calendar-page/calendar-page.component';
import { MomentPipe } from '../pipes/moment.pipe';
import { AbonementPageComponent } from './abonement-page/abonement-page.component';
import { CreateAbonementPageComponent } from './create-abonement-page/create-abonement-header/create-abonement-page.component';
import { CreateAbonementFormComponent } from './create-abonement-page/create-abonement-form/create-abonement-form.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { CreateUserHeaderComponent } from './create-user/create-user-header/create-user-header.component';
import { CreateAdminComponent } from './create-user/create-admin/create-admin.component';
import { CreateTrainerComponent } from './create-user/create-trainer/create-trainer.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AbonementComponent,
    AbonementPageComponent,
    CreateAbonementPageComponent,
    CreateAbonementFormComponent,
    
    CalendarComponent,
    CalendarPageComponent,
    MomentPipe,

    CreateUserComponent,
    CreateUserHeaderComponent,
    CreateTrainerComponent,
    CreateAdminComponent,
  ],
  imports: [
    AbonementPageMRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  exports: [RouterModule],

  providers: [FirebaseService, TaskService],

})
export class AbonementPageMModule { }
