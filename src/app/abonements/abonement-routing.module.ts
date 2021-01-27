import { NgModule } from '@angular/core';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { Routes, RouterModule } from '@angular/router';
import { AbonementGuard } from '../guards/abonement.guard';
import { AbonementComponent } from './abonement/abonement.component';
import { CreateAbonementFormComponent } from './create-abonement-page/create-abonement-form/create-abonement-form.component';
import { CreateAdminComponent } from './create-user/create-admin/create-admin.component';
import { CreateTrainerComponent } from './create-user/create-trainer/create-trainer.component';
import { CreateUserComponent } from './create-user/create-user.component';
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
  // {path: '', component: AbonementComponent, canActivate: [AngularFireAuthGuard, AbonementGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }},
  // { path: 'create-abonement', component: CreateAbonementFormComponent, canActivate: [AngularFireAuthGuard, AbonementGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }},
  // { path: 'create-user', component: CreateUserComponent,  canActivate: [AngularFireAuthGuard, AbonementGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }},
  // { path: 'create-trainer', component: CreateTrainerComponent, canActivate: [AngularFireAuthGuard, AbonementGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }},
  // { path: 'create-admin', component: CreateAdminComponent, canActivate: [AngularFireAuthGuard, AbonementGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class AbonementPageMRoutingModule { }
