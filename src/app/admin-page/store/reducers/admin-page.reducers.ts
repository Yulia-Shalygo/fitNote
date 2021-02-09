import { state } from "@angular/animations";
import { Action, createReducer, on } from "@ngrx/store";
import { createAdminError, createAdminSuccess, createTrainerError, createTrainerSuccess, getAdminsError, getAdminsSuccess, getTrainersError, getTrainersSuccess } from "../actions/admin-page.actions";
import { adminInitialState, AdminState } from "../state/admin-page.state";

export const ADMIN_PAGE_NODE = 'admins';

export const AdminReducer = createReducer(
    adminInitialState,

    // GET ADMINS
    on(getAdminsSuccess, (state, { admins }) => ({
        admins: [...admins]
    })),

    on(getAdminsError, (state, action) => ({
        ...state,
        error: action.error.code
    })),

    // GET TRAINERS
    on(getTrainersSuccess, (state, { trainers }) => ({
        ...state,
        trainers: [...trainers]
    })),

    on(getTrainersError, (state, action) => ({
        ...state,
        error: action.error.code
    })),

    // CREATE ADMIN
    on(createAdminSuccess, (state, { admin }) => ({
        ...state,
        admins: [...state.admins, admin]
    })),

    on(createAdminError, (state, action) => ({
        ...state,
        error: action.error.code
    })),

    // CREATE TRAINER
    // ?????????????????????????????????????????????????
    on(createTrainerSuccess, (state, { trainer }) => ({
        ...state,
        trainers: trainer // [...state.trainers, trainer]
    })),

    on(createTrainerError, (state, action) => ({
        ...state,
        error: action.error.code
    })),
);

export function reducer(state: AdminState | undefined, action: Action) {
    return AdminReducer(state, action);
}