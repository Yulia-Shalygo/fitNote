import { createAction, props } from "@ngrx/store";
import { User } from "src/app/auth/store/models/user.model";

export enum AbonementActionType {
    getUsers = '[Abonement] Get Users',
    getUsersSuccess = '[Abonement] Get Users Success',
    getUsersError = '[Abonement] Get Users Error',

    createClient = '[Abonement] Create Client',
    createClientSuccess = '[Abonement] Create Client Success',
    createClientError = '[Abonement] Create Client Error',

    createAdmin = '[Abonement] Create Admin',
    createAdminSuccess = '[Abonement] Create Admin Success',
    createAdminError = '[Abonement] Create Admin Error',

    createTrainer = '[Abonement] Create Trainer',
    createTrainerSuccess = '[Abonement] Create Trainer Success',
    createTrainerError = '[Abonement] Create Trainer Error',
};

export const getUsers = createAction(
    AbonementActionType.getUsers
);

export const getUsersSuccess = createAction(
    AbonementActionType.getUsersSuccess,
    props<{ users: User[] }>()
);

export const getUsersError = createAction(
    AbonementActionType.getUsersError,
    props<{ error: any }>()
);

// CREATE CLIENT
export const createClient = createAction(
    AbonementActionType.createClient,
    props<{ user: User }>()
);

export const createClientSuccess = createAction(
    AbonementActionType.createClientSuccess,
    props<{ user: User }>()
);

export const createClientError = createAction(
    AbonementActionType.createClientError,
    props<{ error: any }>()
);

// CREATE ADMIN
export const createAdmin = createAction(
    AbonementActionType.createAdmin,
    props<{ user: User }>()
);

export const createAdminSuccess = createAction(
    AbonementActionType.createAdminSuccess,
    props<{ user: User }>()
);

export const createAdminError = createAction(
    AbonementActionType.createAdminError,
    props<{ error: any }>()
);