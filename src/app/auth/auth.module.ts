import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { AuthEffects } from './store/effects/auth.effects';
import { AUTH_REDUCER_NODE, reducerAuth } from './store/reducers/auth.reducers';
import { CommonModule } from '@angular/common';  
import { AboutComponent } from './about/about/about.component';

@NgModule({
    declarations: [
        AuthComponent,
        LoginComponent,
        AboutComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        HttpClientModule,

        EffectsModule.forFeature([AuthEffects]), 
        StoreModule.forFeature(AUTH_REDUCER_NODE, reducerAuth)
    ],
    providers: []
})
export class AuthModule { }