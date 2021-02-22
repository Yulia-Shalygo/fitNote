import { Exercise } from "./exercise.model";

export interface Note {
    id?: string;
    exerciseId: number; // Exercise;
    repeated: number;
    date: any;
}