import ExerciseActionTypes from './exercise.types';
import { defaultExercises } from './exercise.data';

const INITIAL_STATE = {
  exercises: defaultExercises,
};

const ExerciseReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ExerciseActionTypes.ADD_EXERCISES:
      return {
        ...state,
        exercises: action.payload,
      };
    default:
      return state;
  }
};

export default ExerciseReducer;
