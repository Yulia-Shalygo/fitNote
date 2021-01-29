import { Action, createReducer, on } from "@ngrx/store";
import { logOutSuccess } from "src/app/auth/store/actions/auth.actions";
import { createAdminSuccess, createClientError, createClientSuccess, getUsersError, getUsersSuccess } from "../actions/abonement.actions";
import { abonementInitialState, AbonementState } from "../state/abonement.state";

export const ABONEMENT_REDUCER_NODE = 'abonement';

export const AbonementReducer = createReducer(
    abonementInitialState,

    on(getUsersSuccess, (state, { users }) => ({
        users: users
    })),

    on(getUsersError, (state, action) => ({
        ...state,
        error: action.error.message
    })),

    // CREATE CLIENT
    on(createClientSuccess, (state, { user }) => ({
        ...state,
        users: [...state.users, user]
    })),

    on(createClientError, (state, action) => ({
        ...state,
        error: action.error.code
    })),

    // CREATE ADMIN
    // on(createAdminSuccess, (state, { user }) => ({
        
    // })),


    on(logOutSuccess, () => ({
        users: []
    })),
);

export function reducer(state: AbonementState | undefined, action: Action) {
    return AbonementReducer(state, action);
}
