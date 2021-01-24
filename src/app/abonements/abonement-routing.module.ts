import { NgModule } from '@angular/core';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { Routes, RouterModule } from '@angular/router';
import { AbonementGuard } from '../guards/abonement.guard';
import { AbonementComponent } from './abonement/abonement.component';
import { CreateAbonementPageComponent } from './create-abonement-page/create-abonement-header/create-abonement-page.component';
// import { CreateAbonementPageComponent } from './create-abonement-page/create-abonement-header/create-abonement-page.component';
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);


const routes: Routes = [
//   { path: '', component: AbonementComponent },
//   { path: 'abonement', component: AbonementComponent, canActivate: [AngularFireAuthGuard, AbonementGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }},
{ path: 'abonement/create-abonement', component: CreateAbonementPageComponent, canActivate: [AngularFireAuthGuard, AbonementGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class AbonementPageMRoutingModule { }
