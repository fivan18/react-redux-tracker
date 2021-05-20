import React from 'react';
import {
  render, screen,
} from '@testing-library/react';

import SubmitButton from '../../components/submit-button';

describe('SubmitButton Component', () => {
  test('show submit button', async () => {
    render(
      <SubmitButton>Submit</SubmitButton>,
    );
    expect(await screen.findByText('Submit')).toBeInTheDocument();
  });
});
