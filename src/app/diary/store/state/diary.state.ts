import { Exercise } from "../models/exercise.model";
import { Note } from "../models/note.model";

export const diaryInitialState: DiaryState = {
    bodies: [],
    exercises: [],
    notes: [],
    error: null
}
export interface DiaryState {
    bodies: Body[];
    exercises: Exercise[];
    notes: Note[];
    error: any;
}