import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AbonementComponent } from './abonement/abonement.component';

const routes: Routes = [{ path: '', component: AbonementComponent }];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class AbonementPageMRoutingModule { }
