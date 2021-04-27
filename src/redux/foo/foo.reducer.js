import FooActionTypes from './foo.types';
import { defaultFoos } from './foo.data';

const INITIAL_STATE = {
  foos: defaultFoos,
};

const fooReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FooActionTypes.ADD_FOOS:
      return {
        ...state,
        foos: action.payload,
      };
    default:
      return state;
  }
};

export default fooReducer;
