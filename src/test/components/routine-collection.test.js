import React from 'react';
import axios from 'axios';
import {
  render, screen, cleanup,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { sessionService } from 'redux-react-session';

import RoutineCollection from '../../components/routine-collection';
import { progressData, routineData } from '../mock.data';
import store from '../../redux/store';

jest.mock('axios');

afterEach(() => {
  cleanup();
});

describe('RoutineCollection Component', () => {
  test('display a collection of exercises', async () => {
    sessionService.saveSession({ token: 'token' })
      .then(() => {
        sessionService.saveUser({ username: 'username' })
          .then(() => { });
      });

    axios.get.mockImplementationOnce(() => Promise.resolve({ data: { data: progressData } }));

    const history = createMemoryHistory();
    render(
      <Provider store={store}>
        <Router history={history}>
          <RoutineCollection exercises={routineData} />
        </Router>
      </Provider>,
    );

    const exercises = screen.getAllByRole('link');
    expect(exercises).toHaveLength(2);
  });
});
