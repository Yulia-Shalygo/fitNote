import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { from, of } from "rxjs";
import { catchError, exhaustMap, map } from "rxjs/operators";
import { FirebaseService } from "src/app/services/firebase.service";
import { createAdmin, createAdminError, createAdminSuccess, createTrainer, createTrainerSuccess, getAdmins, getAdminsSuccess, getTrainers, getTrainersError, getTrainersSuccess } from "../actions/admin-page.actions";
import { getAdminErrors } from "../selectors/admin-page.selectors";


@Injectable()
export class AdminEffects {
    constructor(
        private action: Actions,
        private firebaseService: FirebaseService,
    ) { }

    createAdmin = createEffect(() => this.action.pipe(
        ofType(createAdmin),
        exhaustMap(({ admin }) => from(this.firebaseService.createAdmin(admin)).pipe(
            map(() => createAdminSuccess({ admin })),
            catchError((error) => of(createAdminError({ error })))
        ))
    ));

    createTrainer = createEffect(() => this.action.pipe(
        ofType(createTrainer),
        exhaustMap(({ trainer }) => from(this.firebaseService.createTrainer(trainer)).pipe(
            map(() => createTrainerSuccess({ trainer })),
            catchError((error) => of(createAdminError({ error })))
        ))
    ));

    getAdmins = createEffect(() => this.action.pipe(
        ofType(getAdmins),
        exhaustMap(() => from(this.firebaseService.getAllUsers()).pipe(
            map((users) => users.filter(admin => admin.role === 'admin')),
            map(admins => getAdminsSuccess({ admins })),
            catchError((error) => of(getAdminErrors({ error })))
        ))
    ));

    getTrainers = createEffect(() => this.action.pipe(
        ofType(getTrainers),
        exhaustMap(() => from(this.firebaseService.getAllUsers()).pipe(
            map((users) => users.filter(trainer => trainer.role === 'trainer')),
            map(trainers => getTrainersSuccess({ trainers })),
            catchError((error) => of(getTrainersError({ error })))
        ))
    ));
}