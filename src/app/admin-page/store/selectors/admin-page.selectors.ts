import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AdminState } from "../state/admin-page.state";

export const adminSelector = createFeatureSelector('admins');
export const getAdminErrors = createSelector(
    adminSelector,
    (state: AdminState) => state.error
);

export const getAllAdmins = createSelector(
    adminSelector,
    (state: AdminState) => state.admins
);