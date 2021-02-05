import { Action, createReducer, on } from '@ngrx/store';
import { logOutSuccess } from 'src/app/auth/store/actions/auth.actions';
import { createAbonementError, createAbonementSuccess, createClientError, createClientSuccess, getShapes, getShapesError, getShapesSuccess, getUsersError, getUsersSuccess } from '../actions/abonement.actions';
import { abonementInitialState, AbonementState } from '../state/abonement.state';

export const ABONEMENT_REDUCER_NODE = 'abonement';

export const AbonementReducer = createReducer(
    abonementInitialState,

    on(getUsersSuccess, (state, { users }) => ({
        users: [...users]
    })),

    on(getUsersError, (state, action) => ({
        ...state,
        error: action.error.code
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

    // CREATE ABONEMENT
    on(createAbonementSuccess, (state, action) => ({
        ...state,
        users: [...state.users, action.abonement]
    })),

    on(createAbonementError, (state, action) => ({
        ...state,
        error: action.error.code
    })),

    // GET SHAPES OF ABONEMENTS
    on(getShapesSuccess, (state, { shapes }) => ({
        ...state,
        shapes: [...shapes]
    })),

    on(getShapesError, (state, action) => ({
        ...state,
        error: action.error.code
    })),

    on(logOutSuccess, () => ({
        users: []
    })),
);

export function reducer(state: AbonementState | undefined, action: Action) {
    return AbonementReducer(state, action);
}
