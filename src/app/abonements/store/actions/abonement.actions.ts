import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/auth/store/models/user.model';
import { Abonement } from '../models/abonement.model';
import { Shape } from '../models/shape.model';

export enum AbonementActionType {
    getUsers = '[Abonement] Get Users',
    getUsersSuccess = '[Abonement] Get Users Success',
    getUsersError = '[Abonement] Get Users Error',

    createClient = '[Abonement] Create Client',
    createClientSuccess = '[Abonement] Create Client Success',
    createClientError = '[Abonement] Create Client Error',

    createAbonement = '[Abonement] Create Abonement',
    createAbonementSuccess = '[Abonement] Create Abonement Success',
    createAbonementError = '[Abonement] Create Abonement Error',


    getShapes = '[Abonement] Get Shapes',
    getShapesSuccess = '[Abonement] Get Shapes Success',
    getShapesError = '[Abonement] Get Shapes Error',
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


// CREATE ABONEMENT
export const createAbonement = createAction(
    AbonementActionType.createAbonement,
    props<{ abonement: Abonement }>()
);

export const createAbonementSuccess = createAction(
    AbonementActionType.createAbonementSuccess,
    props<{ abonement: Abonement }>()
);

export const createAbonementError = createAction(
    AbonementActionType.createAbonementError,
    props<{ error: any }>()
);

// GET SHAPES OF ABONEMENTS
export const getShapes = createAction(
    AbonementActionType.getShapes
);

export const getShapesSuccess = createAction(
    AbonementActionType.getShapesSuccess,
    props<{ shapes: Shape[] }>()
);

export const getShapesError = createAction(
    AbonementActionType.getShapesError,
    props<{ error: any }>()
);