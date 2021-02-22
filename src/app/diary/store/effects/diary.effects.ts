import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { from, of } from "rxjs";
import { catchError, exhaustMap, map } from "rxjs/operators";
import { DiaryService } from "src/app/services/diary.service";
import { getBodies, getBodiesError, getBodiesSuccess, getExercises, getExercisesError, getExercisesSuccess } from "../actions/diary.actions";

@Injectable()
export class DiaryEffects {

    constructor(
        private action: Actions,
        private diaryService: DiaryService,
    ) { }

    getBodies = createEffect(() => this.action.pipe(
        ofType(getBodies),
        exhaustMap(() => from(this.diaryService.getBodies()).pipe(
            map(bodies => getBodiesSuccess({ bodies })),
            catchError((error) => of(getBodiesError({ error })))
        ))
    ));

    getExercises = createEffect(() => this.action.pipe(
        ofType(getExercises),
        exhaustMap(() => from(this.diaryService.getExercises()).pipe(
            map(exercises => getExercisesSuccess({ exercises })),
            catchError((error) => of(getExercisesError({ error })))
        ))
    ));
}