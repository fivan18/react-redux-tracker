import { createSelector } from 'reselect';
import { mapExercisesToChart } from './exercise.utils';

const selectExercise = (state) => state.exercise;

export const selectExercises = createSelector(
  [selectExercise],
  (exercise) => exercise.exercises,
);

export const selectExercisesForProgress = createSelector(
  [selectExercises],
  (exercises) => mapExercisesToChart(exercises),
);

export const selectExerciseForProgress = createSelector(
  [selectExercises],
  (exercises) => exercises[0],
);

export const ivancito = () => 'ivancito';
