import React from 'react';
import {
  render, screen,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import FormInput from '../../components/form-input';

describe('FormInput Component', () => {
  let text = '';
  const setText = (newText) => {
    text = newText;
  };

  test('type in an input field', async () => {
    render(
      <FormInput
        id="input"
        name="input"
        type="text"
        value={text}
        handleChange={({ target: { value } }) => setText(value)}
        placeholder="text"
      />,
    );

    await userEvent.type(screen.getByRole('textbox'), 'i');
    expect(text).toBe('i');
  });
});
