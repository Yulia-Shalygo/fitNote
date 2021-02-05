import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AngularFireAuthGuard, redirectUnauthorizedTo } from "@angular/fire/auth-guard";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { FirebaseService } from "../services/firebase.service";
import { TaskService } from "../services/task.service";
import { CreateAdminComponent } from "./create-admin/create-admin.component";
import { CreateTrainerComponent } from "./create-trainer/create-trainer.component";
import { AdminPageHeaderComponent } from './admin-page-header/admin-page-header.component';
import { UploadFileService } from "../services/upload-file.service";
import { CreateTrainerHeaderComponent } from './create-trainer-header/create-trainer-header.component';
import { StoreModule } from "@ngrx/store";
import { AdminReducer, ADMIN_PAGE_NODE } from "./store/reducers/admin-page.reducers";
import { EffectsModule } from "@ngrx/effects";
import { AdminEffects } from "./store/effects/admin-page.effects";
import { MainPageComponent } from './main-page/main-page/main-page.component';
import { AdminsTableComponent } from './main-page/admins-table/admins-table.component';
import { MainPageHeaderComponent } from './main-page/main-page-header/main-page-header.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
     // { path: '', component: CreateAdminComponent, },
    { path: '', component: MainPageComponent, },
    { path: 'create-trainer', component: CreateTrainerComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }}, // AbonementGuard
    { path: 'create-admin', component: CreateAdminComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }},
];

@NgModule({
    declarations: [
        CreateTrainerComponent,
        CreateAdminComponent,
        AdminPageHeaderComponent,
        CreateTrainerHeaderComponent,
        MainPageComponent,
        AdminsTableComponent,
        MainPageHeaderComponent
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
        UploadFileService
    ],
  
  })
  export class AdminPageMModule { }
  