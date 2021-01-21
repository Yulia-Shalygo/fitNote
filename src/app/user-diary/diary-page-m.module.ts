import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarPageMRoutingModule } from './diary-page-m-routing.module';
import { DiaryComponent } from './diary/diary.component';
import { MomentPipe } from 'src/app/pipes/moment.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarPageComponent } from './diary-page/diary-page.component';
import { FirebaseService } from 'src/app/services/firebase.service';
import { TaskService } from 'src/app/services/task.service';

@NgModule({
  declarations: [
    DiaryComponent,
    CalendarPageComponent,
    MomentPipe,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    CalendarPageMRoutingModule,
  ],
  providers: [FirebaseService, TaskService],

})
export class CalendarPageMModule { }
