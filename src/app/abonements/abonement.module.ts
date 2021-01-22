import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FirebaseService } from '../services/firebase.service';
import { TaskService } from '../services/task.service';
import { AbonementComponent } from './abonement/abonement.component';
import { AbonementPageMRoutingModule } from './abonement-routing.module';
import { CreateAbonementComponent } from './create-abonement/create-abonement.component';
import { CalendarComponent } from '../calend/calendar/calendar.component';
import { CalendarPageComponent } from '../calend/calendar-page/calendar-page.component';
import { MomentPipe } from '../pipes/moment.pipe';


@NgModule({
  declarations: [
    AbonementComponent,
    CreateAbonementComponent,
    CalendarComponent,
    CalendarPageComponent,
    MomentPipe,
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
