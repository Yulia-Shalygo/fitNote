import { Exercise } from "../models/exercise.model";

export const diaryInitialState: DiaryState = {
    bodies: [],
    exercises: [],
    error: null
}
export interface DiaryState {
    bodies: Body[];
    exercises: Exercise[];
    error: any;
}