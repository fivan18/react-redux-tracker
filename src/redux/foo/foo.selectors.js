import { createSelector } from 'reselect';

const selectFoo = (state) => state.foo;

export const selectFoos = createSelector(
  [selectFoo],
  (foo) => foo.foos,
);