import React from 'react';
import {
  render, screen,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import FormInputNumber from '../../components/form-input-number';

describe('FormInputNumber Component', () => {
  let number = 0;
  const setNumber = (newNumber) => {
    number = newNumber;
  };

  const incrementNumber = () => {
    number += 1;
  };

  const decrementNumber = () => {
    number -= 1;
  };

  test('increment the number by one', async () => {
    render(
      <FormInputNumber
        id="number"
        handleChange={({ target: { value } }) => setNumber(value)}
        value={number}
        increment={incrementNumber}
        decrement={decrementNumber}
        label="Number"
      />,
    );

    await userEvent.click(screen.getByText('+'));
    expect(number).toEqual(1);
  });
  test('decrement the number by one', async () => {
    render(
      <FormInputNumber
        id="number"
        handleChange={({ target: { value } }) => setNumber(value)}
        value={number}
        increment={incrementNumber}
        decrement={decrementNumber}
        label="Number"
      />,
    );

    await userEvent.click(screen.getByText('-'));
    expect(number).toEqual(0);
  });
});
