import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AngularFireAuthGuard, redirectLoggedInTo, redirectUnauthorizedTo } from "@angular/fire/auth-guard";
import { LoginComponent } from './auth/login/login.component';
import { AboutComponent } from './auth/about/about/about.component';
import { AbonementGuard } from './guards/abonement.guard';
import { DiaryGuard } from './guards/diary.guard';
import { DiaryPageComponent } from './diary/diary-page/diary-page.component';
import { AbonementComponent } from './abonements/abonement/abonement.component';
import { CreateAbonementFormComponent } from './abonements/create-abonement-page/create-abonement-form/create-abonement-form.component';
import { CreateUserComponent } from './abonements/create-user/create-user.component';
import { CreateTrainerComponent } from './abonements/create-user/create-trainer/create-trainer.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToCalendar = () => redirectLoggedInTo(['calendar']);
const redirectLoggedInToAbonement = () => redirectLoggedInTo(['abonement']);

const routes: Routes = [
  { path: '', component: AuthComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectLoggedInToCalendar }, children: [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'about', component: AboutComponent },
  ]},
  { path: 'abonement', component: AbonementComponent, canActivate: [AngularFireAuthGuard, AbonementGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }, loadChildren: () => import('./abonements/abonement.module').then(m => m.AbonementPageMModule)},
  { path: 'abonement/create-abonement', component: CreateAbonementFormComponent, canActivate: [AngularFireAuthGuard, AbonementGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }},
  { path: 'abonement/create-user', component: CreateUserComponent,  canActivate: [AngularFireAuthGuard, AbonementGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }},
  { path: 'abonement/create-trainer', component: CreateTrainerComponent, canActivate: [AngularFireAuthGuard, AbonementGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }},
  { path: 'abonement/create-admin', component: CreateTrainerComponent, canActivate: [AngularFireAuthGuard, AbonementGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }},

  { path: 'calendar', component: AuthComponent, canActivate: [AngularFireAuthGuard, DiaryGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }, }, //  loadChildren: () => import('./calend/calendar-page-m.module').then(m => m.CalendarPageMModule)
  { path: 'diary', component: DiaryPageComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin },}, 
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
