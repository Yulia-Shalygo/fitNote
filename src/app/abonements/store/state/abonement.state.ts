import { User } from "src/app/auth/store/models/user.model";

export const abonementInitialState: AbonementState = {
    users: [],
    error: null,
};

export interface AbonementState {
    users: User[];
    error: any;
};