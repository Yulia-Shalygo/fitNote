import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { from, of } from 'rxjs';
import { catchError, exhaustMap, map} from 'rxjs/operators';
import { FirebaseService } from 'src/app/services/firebase.service';
import { getUser, getUserError, getUserSuccess, logOut, logOutError, logOutSuccess, signIn, signInError, signInSuccess } from '../actions/auth.actions';

@Injectable()
export class AuthEffects {
    constructor(
        private actions: Actions,
        private firebaseService: FirebaseService,
    ) {}

    signin = createEffect(() => this.actions.pipe(
        ofType(signIn),
        exhaustMap((action) =>
            from(this.firebaseService.signin(action.user.email, action.user.password)).pipe(
                map(userId => signInSuccess({ userId })),
                catchError(error => of(signInError({ error })))
            )
        )
    ));

    logout = createEffect(() => this.actions.pipe(
        ofType(logOut),
        exhaustMap(() => from(this.firebaseService.logout()).pipe(
            map(() =>logOutSuccess()),
            catchError((error) => of(logOutError({ error })))
        ))
    ));

    getUser = createEffect(() => this.actions.pipe(
        ofType(getUser),
        exhaustMap(() => of(this.firebaseService.getUser()).pipe(
            map((userId) => getUserSuccess({ userId })),
            catchError((error) => of(getUserError({ error })))
        ))
    ));
}