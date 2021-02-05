import { Abonement } from "src/app/abonements/store/models/abonement.model";

export interface User {
    userId?: string;
    email: string;
    password?: string;
    name?: string;
    birth?: string;
    phone?: string;
    comment?: string;
    workExperience?: string;
    education?: string;
    address?: string;
    workSchedule?: string;

    abonement?: Abonement;
    image?: any;

    role?: string;
};