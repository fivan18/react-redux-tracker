import { combineReducers } from 'redux';
import { sessionReducer } from 'redux-react-session';

import exerciseReducer from './exercise/exercise.reducer';

const rootReducer = combineReducers({
  exercise: exerciseReducer,
  session: sessionReducer,
});

export default rootReducer;
