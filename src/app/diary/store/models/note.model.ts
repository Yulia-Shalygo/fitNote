import { Exercise } from "./exercise.model";

export interface Note {
    id?: string;
    exercise: Exercise;
    firstRepeated: number;
    firstWeigth?: number;

    secondRepeated?: number;
    secondWeigth?: number;

    thirdRepeated?: number;
    thirdWeigth?: number;

    fourthRepeated?: number;
    fourthWeigth?: number;

    fifthRepeated?: number;
    fifthWeigth?: number;

    date: any;
}