import { createReducer, on } from "@ngrx/store";
import { getAllNotesError, getAllNotesSuccess, getBodiesError, getBodiesSuccess, getExercisesError, getExercisesSuccess } from "../actions/diary.actions";
import { diaryInitialState } from "../state/diary.state";

export const DIARY_PAGE_NODE = 'diary';

export const DiaryReducer = createReducer(
    diaryInitialState,

    // GET BODIES 
    on(getBodiesSuccess, (state, { bodies }) => ({
        ...state,
        bodies: [...bodies]
    })),

    on(getBodiesError, (state, action) => ({
        ...state,
        error: action.error.code
    })),

    // GET EXERCISES
    on(getExercisesSuccess, (state, { exercises }) => ({
        ...state,
        exercises: [...exercises]
    })),

    on(getExercisesError, (state, action) => ({
        ...state,
        error: action.error.code
    })),

    // GET ALL NOTES
    on(getAllNotesSuccess, (state, { notes }) => ({
        ...state,
        notes: [...notes]
    })),

    on(getAllNotesError, (state, action) => ({
        ...state,
        error: action.error.code
    })),  
    
    // CREATE NOTE 
    // on(createNoteSuccess, (state, { note }) => ({
    //     ...state,
    //     notes: [...state.notes, note]
    // })),
    
    // on(createNoteError, (state, action) => ({
    //     ...state,
    //     error: action.error.code
    // })),
);