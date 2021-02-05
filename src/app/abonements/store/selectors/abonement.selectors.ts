import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AbonementState } from "../state/abonement.state";

export const abonementSelector = createFeatureSelector('abonement');
export const getAbonementError = createSelector(
    abonementSelector,
    (state: AbonementState) => state.error
);

export const getUsersSelector = createSelector(
    abonementSelector,
    (state: AbonementState) => {
        const users = state.users.filter((item) => item.role === 'client');
        if(users) {
            return users;
        } else {
            return [];
        }
    }
);

export const getAdminsSelector = createSelector(
    abonementSelector,
    (state: AbonementState) => {
        const admins = state.users.filter((item) => item.role === 'admin');
        if(admins) {
            return admins;
        } else {
            return [];
        }
    }
);

export const getAbonementByUserIdSelector = (userId: string) => createSelector(
    abonementSelector,
    (state: AbonementState) => {
        const user = state.users.find((item) => item.userId === userId);
        if(user) return user;
        else return null;
    }
);

// SHAPES 
export const getShapeByID = (shapeId: number) => createSelector(
    abonementSelector,
    (state: AbonementState) => {
        if (state.shapes) {
            const shape = state.shapes.find((item) => item.id === shapeId);
            if(shape) return shape;
            else return null;
        }
    }
);

export const getAllShapes = createSelector(
    abonementSelector,
    (state: AbonementState) => state.shapes
);

export const getShapesWithoutTrainer = createSelector(
    abonementSelector,
    (state: AbonementState) => {
        if (state.shapes) {
            const shapes = state.shapes.filter((item) => item.trainer === false && !item.special);
            if(shapes) {
                return shapes;
            } else {
                return [];
            }
        }
    }
);

export const getShapesWithTrainer = createSelector(
    abonementSelector,
    (state: AbonementState) => {
        if (state.shapes) {
            const shapes = state.shapes.filter((item) => item.trainer === true);
            if(shapes) {
                return shapes;
            } else {
                return [];
            }
        }
    }
);

export const getSpecialShapes = createSelector(
    abonementSelector,
    (state: AbonementState) => {
        if (state.shapes) {
            const shapes = state.shapes.filter((item) => item.special);
            if(shapes) {
                return shapes;
            } else {
                return [];
            }
        }
    }
);

