import React from 'react';
import {
  render, screen,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import FormInputSelect from '../../components/form-input-select';

describe('FormInputSelect Component', () => {
  let option = 'none';
  const setOption = (newOption) => {
    option = newOption;
  };
  const options = [
    'option1',
    'option2',
    'option3',
    'option4',
  ];

  test('option selection', async () => {
    render(
      <FormInputSelect
        id="option"
        handleChange={({ target: { value } }) => setOption(value)}
        value={option}
        label="Option"
        options={options}
      />,
    );

    expect(screen.getByRole('option', { name: '-- Option --' }).selected).toBe(true);
    userEvent.selectOptions(screen.getByRole('combobox'), 'option1');
    expect(option).toBe('option1');
  });
});
