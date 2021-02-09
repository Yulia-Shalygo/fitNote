import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FirebaseService } from '../services/firebase.service';
import { TaskService } from '../services/task.service';
import { AbonementComponent } from './abonement.component';
import { AbonementPageComponent } from './abonement-page/abonement-page.component';
import { CreateAbonementPageComponent } from './create-abonement-page/create-abonement-header/create-abonement-page.component';
import { CreateAbonementFormComponent } from './create-abonement-page/create-abonement-form/create-abonement-form.component';
import { CreateUserComponent } from './create-users/create-user.component';
import { CreateUserHeaderComponent } from './create-users/create-user-header/create-user-header.component';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { CalendarPageMModule } from '../calend/calendar-page-m/calendar-page-m.module';
import { StoreModule } from '@ngrx/store';
import { AbonementReducer, ABONEMENT_REDUCER_NODE } from './store/reducers/abonement.reducers';
import { EffectsModule } from '@ngrx/effects';
import { AbonementEffects } from './store/effects/abonement.effects';
import { AbonementTableComponent } from './abonement-page/abonement-table/abonement-table.component';
import { AbonementGuard } from '../guards/abonement.guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
  { 
    path: '',
    component: AbonementComponent,
    canActivate: [AbonementGuard], 
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  { path: 'create-abonement/:id', component: CreateAbonementFormComponent, canActivate: [AngularFireAuthGuard, AbonementGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }},
  { path: 'create-user', component: CreateUserComponent,  canActivate: [AngularFireAuthGuard, AbonementGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }},
];

@NgModule({
  declarations: [
    AbonementComponent,
    AbonementPageComponent,
    CreateAbonementPageComponent,
    CreateAbonementFormComponent,

    CreateUserComponent,
    CreateUserHeaderComponent,
    AbonementTableComponent,
  ],
  imports: [
    RouterModule.forChild(routes),

    CalendarPageMModule,
    
    FormsModule,
    ReactiveFormsModule,
    CommonModule,

    StoreModule.forFeature(ABONEMENT_REDUCER_NODE, AbonementReducer),
    EffectsModule.forFeature([AbonementEffects])
  ],
  exports: [RouterModule],

  providers: [FirebaseService, TaskService],

})
export class AbonementPageMModule { }
