import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { sessionService } from 'redux-react-session';
import axios from 'axios';

import RoutineForm from '../components/routine-form';
import RoutineCollection from '../components/routine-collection';
import { apiUrl } from '../utilities/utils';

const Routine = ({ match: { params: { routineId } }, history }) => {
  const [date, setDate] = useState(' ');
  const [exercises, setExercises] = useState([]);
  const [refresh, setRefresh] = useState(1 + Math.random() * (100 - 1));

  useEffect(() => {
    let mounted = true;

    sessionService.loadSession()
      .then(({ token }) => {
        axios({
          method: 'get',
          url: `${apiUrl}/routines/${routineId}/exercises`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then(({ data: { data } }) => {
            if (mounted) {
              axios({
                method: 'get',
                url: `${apiUrl}/routines/${routineId}`,
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              })
                .then(({ data: { data: { attributes: { day } } } }) => {
                  setDate(new Date(`${day}T00:00:00`).toDateString());
                })
                .catch(() => history.push('/not-found'));
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
      <h2>{date}</h2>
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
