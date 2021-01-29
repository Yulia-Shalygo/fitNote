import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map } from "rxjs/operators";
import { FirebaseService } from "src/app/services/firebase.service";
import { createClient, createClientError, createClientSuccess, getUsers, getUsersError, getUsersSuccess } from "../actions/abonement.actions";
import { from, of } from 'rxjs';

@Injectable()
export class AbonementEffects {
    constructor(
        private action: Actions,
        private firebaseService: FirebaseService,
    ) {}

    getUsers = createEffect(() => this.action.pipe(
        ofType(getUsers),
        exhaustMap(() => from(this.firebaseService.getAllUsers()).pipe(
            map((users) => getUsersSuccess({users })),
            catchError((error) => of(getUsersError({ error })))
        ))
    ));

    createClient = createEffect(() => this.action.pipe(
        ofType(createClient),
        exhaustMap(({ user }) => from(this.firebaseService.createClient(user)).pipe(
            map(() => createClientSuccess({ user })),
            catchError((error) => of(createClientError({ error })))
        ))     
    ));
}