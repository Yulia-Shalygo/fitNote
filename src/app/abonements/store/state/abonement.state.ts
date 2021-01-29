import { User } from "src/app/auth/store/models/user.model";

export const abonementInitialState: AbonementState = {
    users: []
};

export interface AbonementState {
    users: User[];
};