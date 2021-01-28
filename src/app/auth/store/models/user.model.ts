// export interface User {
//     id?: string,
//     email: string;
//     password: string;
// };

export interface User {
    email: string;
    password?: string;
    isAdmin?: boolean;
    name?: string;
    birth?: string;
    phone?: string;
    comment?: string;
    workExperience?: string;
    education?: string;
    address?: string;
    workSchedule?: string;
};