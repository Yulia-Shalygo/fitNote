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
