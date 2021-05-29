import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AngularFireAuthGuard, redirectUnauthorizedTo } from "@angular/fire/auth-guard";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { FirebaseService } from "../services/firebase.service";
import { TaskService } from "../services/task.service";
import { CreateAdminComponent } from "./admin/create-admin/create-admin.component";
import { CreateTrainerComponent } from "./trainer/create-trainer/create-trainer.component";
import { StoreModule } from "@ngrx/store";
import { AdminReducer, ADMIN_PAGE_NODE } from "./store/reducers/admin-page.reducers";
import { EffectsModule } from "@ngrx/effects";
import { AdminEffects } from "./store/effects/admin-page.effects";
import { MainPageComponent } from './admin/main-page/main-page/main-page.component';
import { AdminsTableComponent } from './admin/main-page/admins-table/admins-table.component';
import { MainPageHeaderComponent } from './admin/main-page/main-page-header/main-page-header.component';
import { TrainerPageComponent } from './trainer/trainer-page/trainer-page.component';
import { TrainerTableComponent } from './trainer/trainer-page/trainer-table/trainer-table.component';
import { AdminGuard } from "../guards/admin.guard";

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
    { 
      path: '', 
      component: MainPageComponent, 
      canActivate: [AdminGuard], 
      data: { authGuardPipe: redirectUnauthorizedToLogin },
     },
    { path: 'create-admin/:id', component: CreateAdminComponent, canActivate: [AngularFireAuthGuard, AdminGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }},
    { path: 'create-admin', component: CreateAdminComponent, canActivate: [AngularFireAuthGuard, AdminGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }},
    
    { path: 'trainers', component: TrainerPageComponent, canActivate: [AngularFireAuthGuard, AdminGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }},
    { path: 'create-trainer', component: CreateTrainerComponent, canActivate: [AngularFireAuthGuard, AdminGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }}, // AbonementGuard
    { path: 'create-trainer/:id', component: CreateTrainerComponent, canActivate: [AngularFireAuthGuard, AdminGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }}, // AbonementGuard

  ];

@NgModule({
    declarations: [
      CreateTrainerComponent,
      CreateAdminComponent,
      MainPageComponent,
      AdminsTableComponent,
      MainPageHeaderComponent,
      TrainerPageComponent,
      TrainerTableComponent
    ],
    imports: [
      RouterModule.forChild(routes),

      FormsModule,
      ReactiveFormsModule,
      CommonModule,
  
      StoreModule.forFeature(ADMIN_PAGE_NODE, AdminReducer),
      EffectsModule.forFeature([AdminEffects])
    ],
    exports: [RouterModule],
  
    providers: [
        FirebaseService,
        TaskService,
    ],
  
  })
  export class AdminPageMModule { }
  