import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthComponent } from './auth/auth.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FirebaseService } from './services/firebase.service';

import { AngularFireModule } from '@angular/fire';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { environment } from '../environments/environment';
import { LoginComponent } from './auth/login/login.component';
import { AboutComponent } from './auth/about/about/about.component';
import { DiaryPageComponent } from './diary/diary-page/diary-page.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [
    AppComponent,
    // AuthComponent,
    // LoginComponent,
    // AboutComponent,
    DiaryPageComponent,
  ],
  imports: [
    RouterModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    AuthModule,
    
    AngularFireModule.initializeApp(environment.firebase),
    
    EffectsModule.forRoot([]),
    StoreModule.forRoot({}, {
      runtimeChecks: {
        strictActionImmutability: true,
        strictStateImmutability: true
      }
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),

  ],
  providers: [FirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
