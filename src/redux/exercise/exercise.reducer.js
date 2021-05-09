import ExerciseActionTypes from './exercise.types';
import { defaultExercises } from './exercise.data';
import { mapExercisesToChart } from './exercise.utils';

const INITIAL_STATE = {
  exercises: mapExercisesToChart(defaultExercises),
};

const ExerciseReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ExerciseActionTypes.ADD_EXERCISES:
      return {
        ...state,
        exercises: mapExercisesToChart(action.payload),
      };
    default:
      return state;
  }
};

export default ExerciseReducer;
