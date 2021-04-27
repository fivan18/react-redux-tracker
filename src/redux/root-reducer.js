import { combineReducers } from 'redux';

import fooReducer from './foo/foo.reducer';

const rootReducer = combineReducers({
  foo: fooReducer,
});

export default rootReducer;
