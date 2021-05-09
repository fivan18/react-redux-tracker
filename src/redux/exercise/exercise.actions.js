import ExerciseActionTypes from './exercise.types';

export const addExercises = (exercises) => ({
  type: ExerciseActionTypes.ADD_EXERCISES,
  payload: exercises,
});

export const ivancito = () => 'ivancito';
