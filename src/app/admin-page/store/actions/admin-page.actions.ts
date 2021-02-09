import { createAction, props } from "@ngrx/store";
import { User } from "src/app/auth/store/models/user.model";


export enum AdminPageActionType {
    getAdmins = '[AdminPage] Get Admins',
    getAdminsSuccess = '[AdminPage] Get Admins Success',
    getAdminsError = '[AdminPage] Get Admins Error',

    getTrainers = '[AdminPage] Get Trainers',
    getTrainersSuccess = '[AdminPage] Get Trainers Success',
    getTrainersError = '[AdminPage] Get Trainers Error',

    createAdmin = '[AdminPage] Create Admin',
    createAdminSuccess = '[AdminPage] Create Admin Success',
    createAdminError = '[AdminPage] Create Admin Error',

    createTrainer = '[AdminPage] Create Trainer',
    createTrainerSuccess = '[AdminPage] Create Trainer Success',
    createTrainerError = '[AdminPage] Create Trainer Error',
};

// GET ADMINS
export const getAdmins = createAction(
    AdminPageActionType.getAdmins
);

export const getAdminsSuccess = createAction(
    AdminPageActionType.getAdminsSuccess,
    props<{ admins: User[] }>()
);

export const getAdminsError = createAction(
    AdminPageActionType.getAdminsError,
    props<{ error: any }>()
);

// GET TRAINERS 

export const getTrainers = createAction(
    AdminPageActionType.getTrainers
);

export const getTrainersSuccess = createAction(
    AdminPageActionType.getTrainersSuccess,
    props<{ trainers: User[] }>()
);

export const getTrainersError = createAction(
    AdminPageActionType.getTrainersError,
    props<{ error: any }>()
);
// CREATE ADMIN
export const createAdmin = createAction(
    AdminPageActionType.createAdmin,
    props<{ admin: User }>()
);

export const createAdminSuccess = createAction(
    AdminPageActionType.createAdminSuccess,
    props<{ admin: User }>()
);

export const createAdminError = createAction(
    AdminPageActionType.createAdminError,
    props<{ error: any }>()
);

// CREATE TRAINER
export const createTrainer = createAction(
    AdminPageActionType.createTrainer,
    props<{ trainer: User }>()
);

export const createTrainerSuccess = createAction(
    AdminPageActionType.createTrainerSuccess,
    props<{ trainer: User }>()
);

export const createTrainerError = createAction(
    AdminPageActionType.createTrainerError,
    props<{ error: any }>()
);