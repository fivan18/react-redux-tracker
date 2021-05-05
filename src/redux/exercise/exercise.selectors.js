import { createSelector } from 'reselect';

const selectExercise = (state) => state.exercise;

export const selectExercises = createSelector(
  [selectExercise],
  (exercise) => exercise.exercises,
);

export const ivancito = () => 'ivancito';
