import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { FirebaseService } from 'src/app/services/firebase.service';
import { createAbonement, createAbonementSuccess, createClient, createClientError, createClientSuccess, getShapes, getShapesError, getShapesSuccess, getUsers, getUsersError, getUsersSuccess } from "../actions/abonement.actions";
import { from, of } from 'rxjs';
import { AbonementService } from 'src/app/services/abonement.service';

@Injectable()
export class AbonementEffects {
    constructor(
        private action: Actions,
        private firebaseService: FirebaseService,
        private abonementService: AbonementService,
    ) {}

    getUsers = createEffect(() => this.action.pipe(
        ofType(getUsers),
        exhaustMap(() => from(this.firebaseService.getAllUsers()).pipe(
            map((users) => getUsersSuccess({ users })),
            catchError((error) => of(getUsersError({ error })))
        ))
    ));

    getShapes = createEffect(() => this.action.pipe(
        ofType(getShapes),
        exhaustMap(() => from(this.abonementService.getAllFormOfAbonement()).pipe(
            map((shapes) => getShapesSuccess({ shapes })),
            catchError((error) => of(getShapesError({ error })))
        ))
    ));

    createClient = createEffect(() => this.action.pipe(
        ofType(createClient),
        exhaustMap(({ user }) => from(this.firebaseService.createClient(user)).pipe(
            map(() => createClientSuccess({ user })),
            catchError((error) => of(createClientError({ error })))
        ))     
    ));

    createAbonement = createEffect(() => this.action.pipe(
        ofType(createAbonement),
        exhaustMap(({ abonement }) => from(this.abonementService.createAbonement( abonement )).pipe(
            map(() => createAbonementSuccess({ abonement })),
            catchError((error) => of(createClientError({ error })))
        ))
    ));
}