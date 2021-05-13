import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { sessionService } from 'redux-react-session';
import axios from 'axios';

import RoutineForm from '../components/routine-form';
import RoutineCollection from '../components/routine-collection';

const Routine = ({ match: { params: { routineId } }, history }) => {
  const [exercises, setExercises] = useState([]);
  const [refresh, setRefresh] = useState(1 + Math.random() * (100 - 1));

  useEffect(() => {
    let mounted = true;

    sessionService.loadSession()
      .then(({ token }) => {
        axios({
          method: 'get',
          url: `http://localhost:3000/routines/${routineId}/exercises`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then(({ data: { data } }) => {
            if (mounted) {
              setExercises(data);
            }
          })
          .catch(() => {
            if (mounted) {
              history.push('/not-found');
            }
          });
      })
      .catch(() => {
        if (mounted) {
          history.push('/login');
        }
      });

    // eslint-disable-next-line no-return-assign
    return () => mounted = false;
  }, [refresh]);

  return (
    <div className="routine">
      <RoutineForm setRefresh={setRefresh} />
      <RoutineCollection exercises={exercises} />
    </div>
  );
};

Routine.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      routineId: PropTypes.string,
    }),
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default withRouter(Routine);
