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
import { AbonementTableComponent } from './abonement-page/abonement-table/abonement-table.component';
import { AbonementPageComponent } from './abonement-page/abonement-page.component';
import { CreateAbonementPageComponent } from './create-abonement-page/create-abonement-header/create-abonement-page.component';
import { CreateAbonementFormComponent } from './create-abonement-page/create-abonement-form/create-abonement-form.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { CreateUserHeaderComponent } from './create-user/create-user-header/create-user-header.component';
// import { CreateAbonementHeaderComponent } from './create-abonement-page/create-abonement-header/create-abonement-header.component';


@NgModule({
  declarations: [
    AbonementComponent,

    AbonementPageComponent,
    AbonementTableComponent,

    CreateAbonementPageComponent,
    
    CalendarComponent,
    CalendarPageComponent,

    MomentPipe,

    CreateAbonementFormComponent,

    CreateUserComponent,

    CreateUserHeaderComponent,

    // CreateAbonementHeaderComponent,

  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AbonementPageMRoutingModule,
  ],
  providers: [FirebaseService, TaskService],

})
export class AbonementPageMModule { }
