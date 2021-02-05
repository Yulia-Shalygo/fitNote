import { User } from "src/app/auth/store/models/user.model";

// доб тренера и админа
export const adminInitialState: AdminState = {
    trainers: [],
    admins: [],
    error: null
}

export interface AdminState {
    trainers: [];
    admins: User[];
    error: any;
}