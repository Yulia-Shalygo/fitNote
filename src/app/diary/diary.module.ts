import { NgModule } from "@angular/core";
import { DiaryHeaderComponent } from "./main-page/diary-header/diary-header.component";
import { DiaryOneClickComponent } from "./main-page/diary-one-click/diary-one-click.component";

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { StoreModule } from "@ngrx/store";
import { DiaryReducer, DIARY_PAGE_NODE } from "./store/reducers/diary.reducers";
import { EffectsModule } from "@ngrx/effects";
import { DiaryEffects } from "./store/effects/diary.effects";
import { StubMatRowDefDirective } from "../StubMatRowDefDirective.directive";
import { matHeaderCellDef } from "../matHeaderRowDef.directive";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { CreateNoteComponent } from "./create-note-page/create-note/create-note.component";
import { AngularFireAuthGuard, redirectUnauthorizedTo } from "@angular/fire/auth-guard";
import { MatButtonModule } from "@angular/material/button";
import { MatNativeDateModule, MatRippleModule } from "@angular/material/core";

import {MatDatepickerModule} from '@angular/material/datepicker';
import { CreateDiaryHeaderComponent } from './create-note-page/create-diary-header/create-diary-header.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatStepperModule} from '@angular/material/stepper';
import { ExerciseBodyComponent } from './exercises/exercise-body/exercise-body.component';
import { ExercisesBodyHeaderComponent } from './exercises/exercises-body-header/exercises-body-header.component';
import { ExerciseByBodyComponent } from './exercises/exercise-by-body/exercise-by-body/exercise-by-body.component';
import { ExerciseByBodyHeaderComponent } from './exercises/exercise-by-body/exercise-by-body-header/exercise-by-body-header.component';
import { ExerciseByBodyTableComponent } from './exercises/exercise-by-body/exercise-by-body-table/exercise-by-body-table.component';
import { ExercisesCalendarPageComponent } from "./exercises-calendar/exercises-calendar-page/exercises-calendar-page.component";
import { CalendarHeaderComponent } from "./exercises-calendar/calendar-header/calendar-header.component";
import { MomentPipe } from "../pipes/moment.pipe";
import { ShowNoteComponent } from './show-note/show-note/show-note.component';
import { ShowNoteHeaderComponent } from "./show-note/show-note-header/show-note-header.component";

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
    { path: '', component: DiaryOneClickComponent,},
    { path: 'create-note', component: CreateNoteComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin },},

    { path: 'exercises', component: ExerciseBodyComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin },},
    { path: 'exercises/body/:id', component: ExerciseByBodyComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin },},

    { path: 'exercises-calendar', component: ExercisesCalendarPageComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin },},
    { path: 'exercises-calendar/note/:date', component: ShowNoteComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin },},
];

@NgModule({
    declarations: [
        DiaryHeaderComponent,
        DiaryOneClickComponent,

        StubMatRowDefDirective,
        matHeaderCellDef,

        CreateNoteComponent,
        CreateDiaryHeaderComponent,

        ExerciseBodyComponent,
        ExercisesBodyHeaderComponent,

        ExerciseByBodyComponent,
        ExerciseByBodyHeaderComponent,
        ExerciseByBodyTableComponent,
        
        ExercisesCalendarPageComponent,
        CalendarHeaderComponent,

        ShowNoteComponent,
        ShowNoteHeaderComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        FormsModule,
        ReactiveFormsModule,
        CommonModule,

        MatTableModule,
        MatPaginatorModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatExpansionModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatRippleModule,
        MatSelectModule,
        MatStepperModule,

        StoreModule.forFeature(DIARY_PAGE_NODE, DiaryReducer),
        EffectsModule.forFeature([DiaryEffects])
    ],
    exports: [],
    providers: []
})
export class DiaryModule { }
