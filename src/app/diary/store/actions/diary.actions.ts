import { createAction, props } from "@ngrx/store";
import { Exercise } from "../models/exercise.model";

export enum DiaryPageActionType {
    getBodies = '[Diary] Get Bodies',
    getBodiesSuccess = '[Diary] Get Bodies Success',
    getBodiesError = '[Diary] Get Bodies Error',

    getExercises = '[Diary] Get Exercises',
    getExercisesSuccess = '[Diary] Get Exercises Success',
    getExercisesError = '[Diary] Get Exercises Error'
};

// GET BODIES
export const getBodies = createAction(
    DiaryPageActionType.getBodies
);

export const getBodiesSuccess = createAction(
    DiaryPageActionType.getBodiesSuccess,
    props<{ bodies: Body[]}>()
);

export const getBodiesError = createAction(
    DiaryPageActionType.getBodiesError,
    props<{ error: any }>()
);

//GET EXERCISES
export const getExercises = createAction(
    DiaryPageActionType.getExercises
);

export const getExercisesSuccess = createAction(
    DiaryPageActionType.getExercisesSuccess,
    props<{ exercises: Exercise[] }>()
);

export const getExercisesError = createAction(
    DiaryPageActionType.getExercisesError,
    props<{ error: any }>()
);