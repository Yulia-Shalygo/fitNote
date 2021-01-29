import { createFeatureSelector, createSelector } from "@ngrx/store";
import { State } from "src/app/auth/store/state/app.state";
import { AbonementState } from "../state/abonement.state";

export const abonementSelector = createFeatureSelector('abonement');
export const getAbonementError = createSelector(
    abonementSelector,
    (state: AbonementState) => state.error
);

export const getUsersSelector = createSelector(
    abonementSelector,
    (state: AbonementState) => state.users
)