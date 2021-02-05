import { User } from "src/app/auth/store/models/user.model";
import { Shape } from "../models/shape.model";

export const abonementInitialState: AbonementState = {
    users: [],
    shapes: [],
    error: null,
};

export interface AbonementState {
    users: User[];
    shapes: Shape[];
    error: any;
};