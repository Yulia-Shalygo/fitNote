import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AngularFireAuthGuard, redirectLoggedInTo, redirectUnauthorizedTo } from "@angular/fire/auth-guard";
import { LoginComponent } from './auth/login/login.component';
import { AboutComponent } from './auth/about/about/about.component';
import { DiaryGuard } from './guards/diary.guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToDiary = () => redirectLoggedInTo(['diary']);
const redirectLoggedInToAbonement = () => redirectLoggedInTo(['abonement']);

const routes: Routes = [
  { path: '', component: AuthComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectLoggedInToAbonement }, children: [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'about', component: AboutComponent },
  ]},
  // canActivate: [AngularFireAuthGuard, AbonementGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }, 
  { path: 'abonement', canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }, loadChildren: () => import('./abonements/abonement.module').then(m => m.AbonementPageMModule)},

  { path: 'admin-page', canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }, loadChildren: () => import('./admin-page/admin-page.module').then(m => m.AdminPageMModule)}, // AdminPageMModule

  { path: 'diary', component: AuthComponent, canActivate: [AngularFireAuthGuard, DiaryGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }, }, //  loadChildren: () => import('./calend/calendar-page-m.module').then(m => m.CalendarPageMModule)
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
