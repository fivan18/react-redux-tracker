import { combineReducers } from 'redux';
import { sessionReducer } from 'redux-react-session';

import fooReducer from './foo/foo.reducer';

const rootReducer = combineReducers({
  foo: fooReducer,
  session: sessionReducer,
});

export default rootReducer;
