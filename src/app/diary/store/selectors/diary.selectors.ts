import { createFeatureSelector, createSelector } from "@ngrx/store";
import { DiaryState } from "../state/diary.state";

export const diarySelector = createFeatureSelector('diary');

export const getBodiesSelector = createSelector(
    diarySelector,
    (state: DiaryState) => state.bodies
);

export const getExercisesByBodyId = (bodyId: number) => createSelector(
    diarySelector,
    (state: DiaryState) => {
        const body = state.exercises.filter((item) => item.body === bodyId);
        if (body) return body;
        else return null;
    }
);

export const getExercisesSelector = createSelector(
    diarySelector,
    (state: DiaryState) => state.exercises
);

export const getNotesSelector = createSelector(
    diarySelector,
    (state: DiaryState) => state.notes
);

export const getNotesByDateSelector = (date: string) => createSelector(
    diarySelector,
    (state: DiaryState) => {
        const notes = state.notes.filter((item) => item.date === date);
        if (notes) return notes;
        else return null;
    }
);