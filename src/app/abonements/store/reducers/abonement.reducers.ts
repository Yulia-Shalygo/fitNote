import { Action, createReducer, on } from "@ngrx/store";
import { getUsersError, getUsersSuccess } from "../actions/abonement.actions";
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
    }))
);

export function reducer(state: AbonementState | undefined, action: Action) {
    return AbonementReducer(state, action);
}
