import React from 'react';
import axios from 'axios';
import {
  render, screen, cleanup,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { sessionService } from 'redux-react-session';

import RoutineForm from '../../components/routine-form';
import store from '../../redux/store';

jest.mock('axios');

afterEach(() => {
  cleanup();
});

describe('RoutineForm Component', () => {
  // eslint-disable-next-line
  let refresh = 0;
  const setRefresh = (newRefresh) => {
    refresh = newRefresh;
  };

  test('create an exercise for the routine', async () => {
    sessionService.saveSession({ token: 'token' })
      .then(() => {
        sessionService.saveUser({ username: 'username' })
          .then(() => { });
      });

    axios.get.mockImplementationOnce(() => Promise.resolve({ }));

    const history = createMemoryHistory();
    render(
      <Provider store={store}>
        <Router history={history}>
          <RoutineForm setRefresh={setRefresh} />
        </Router>
      </Provider>,
    );

    const selectElements = screen.getAllByRole('combobox');
    const selectName = selectElements[0];
    const selectTempo = selectElements[1];

    userEvent.selectOptions(selectName, 'Pull up');
    userEvent.selectOptions(selectTempo, '10x0');
    userEvent.type(screen.getByLabelText('Sets'), 3);
    userEvent.type(screen.getByLabelText('Reps'), 8);
    userEvent.type(screen.getByLabelText('Rest(sec)'), 90);

    userEvent.click(screen.getByRole('button'));
    expect(history.location.pathname).toBe('/');
  });
});
