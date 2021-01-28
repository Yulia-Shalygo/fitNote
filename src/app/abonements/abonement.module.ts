import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FirebaseService } from '../services/firebase.service';
import { TaskService } from '../services/task.service';
import { AbonementComponent } from './abonement.component';
import { CalendarComponent } from '../calend/calendar/calendar.component';
import { CalendarPageComponent } from '../calend/calendar-page/calendar-page.component';
import { MomentPipe } from '../pipes/moment.pipe';
import { AbonementPageComponent } from './abonement-page/abonement-page.component';
import { CreateAbonementPageComponent } from './create-abonement-page/create-abonement-header/create-abonement-page.component';
import { CreateAbonementFormComponent } from './create-abonement-page/create-abonement-form/create-abonement-form.component';
import { CreateUserComponent } from './create-users/create-user.component';
import { CreateUserHeaderComponent } from './create-users/create-user-header/create-user-header.component';
import { CreateAdminComponent } from './create-users/create-admin/create-admin.component';
import { CreateTrainerComponent } from './create-users/create-trainer/create-trainer.component';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { AbonementGuard } from '../guards/abonement.guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
  { path: '', component: AbonementComponent, },
  { path: 'create-abonement', component: CreateAbonementFormComponent, canActivate: [AngularFireAuthGuard, AbonementGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }},
  { path: 'create-user', component: CreateUserComponent,  canActivate: [AngularFireAuthGuard, AbonementGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }},
  { path: 'create-trainer', component: CreateTrainerComponent, canActivate: [AngularFireAuthGuard, AbonementGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }},
  { path: 'create-admin', component: CreateAdminComponent, canActivate: [AngularFireAuthGuard, AbonementGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }},
];

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
    RouterModule.forChild(routes),

    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  exports: [RouterModule],

  providers: [FirebaseService, TaskService],

})
export class AbonementPageMModule { }
