import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, exhaustMap, map } from "rxjs/operators";
import { AbonementService } from "src/app/services/abonement.service";
import { FirebaseService } from "src/app/services/firebase.service";
import { getUsers, getUsersError, getUsersSuccess } from "../actions/abonement.actions";
import { from, of } from 'rxjs';

@Injectable()
export class AbonementEffects {
    constructor(
        private action: Actions,
        private store: Store,
        private abonementService: AbonementService,
        private firebaseService: FirebaseService,
    ) {}

    getUsers = createEffect(() => this.action.pipe(
        ofType(getUsers),
        exhaustMap(() => from(this.firebaseService.getAllUsers()).pipe(
            map((users) => getUsersSuccess({users })),
            catchError((error) => of(getUsersError({ error })))
        ))
    ));
}