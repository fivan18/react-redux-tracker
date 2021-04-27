import FooActionTypes from './foo.types';

export const addFoos = (foos) => ({
  type: FooActionTypes.ADD_FOOS,
  payload: foos,
});

export const ivancito = () => 'ivancito';
