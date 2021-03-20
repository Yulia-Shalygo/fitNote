import { createAction, props } from "@ngrx/store";
import { Exercise } from "../models/exercise.model";
import { Note } from "../models/note.model";

export enum DiaryPageActionType {
    getBodies = '[Diary] Get Bodies',
    getBodiesSuccess = '[Diary] Get Bodies Success',
    getBodiesError = '[Diary] Get Bodies Error',

    getExercises = '[Diary] Get Exercises',
    getExercisesSuccess = '[Diary] Get Exercises Success',
    getExercisesError = '[Diary] Get Exercises Error',

    getAllNotes = '[Diary] Get All Notes',
    getAllNotesSuccess = '[Diary] Get All Notes Success',
    getAllNotesError = '[Diary] Get All Notes Error',

    // createNote = '[Diary] Create Note',
    // createNoteSuccess = '[Diary] Create Note Success',
    // createNoteError = '[Diary] Create Note Error'
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

// GEI ALL NOTES
export const getAllNotes = createAction(
    DiaryPageActionType.getAllNotes
);

export const getAllNotesSuccess = createAction(
    DiaryPageActionType.getAllNotesSuccess,
    props<{ notes: Note[] }>()
);

export const getAllNotesError = createAction(
    DiaryPageActionType.getAllNotesError,
    props<{ error: any }>()
);

// CREATE NOTE
// export const createNote = createAction(
//     DiaryPageActionType.createNote,
//     props<{ note: Note }>()
// );

// export const createNoteSuccess = createAction(
//     DiaryPageActionType.createNoteSuccess,
//     props<{ note: Note }>()
// );

// export const createNoteError = createAction(
//     DiaryPageActionType.createNoteError,
//     props<{ error: any }>()
// );