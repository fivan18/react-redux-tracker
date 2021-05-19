import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { sessionService } from 'redux-react-session';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

import FormInputNumber from './form-input-number';
import FormInputSelect from './form-input-select';
import { apiUrl, selectExercises, selectTempo } from '../utilities/utils';

const RoutineForm = ({ match: { params: { routineId } }, history, setRefresh }) => {
  const [name, setName] = useState('none');
  const [sets, setSets] = useState(1);
  const [reps, setReps] = useState(1);
  const [rest, setRest] = useState(60);
  const [tempo, setTempo] = useState('none');

  const incrementSets = () => {
    setSets((prev) => prev + 1);
  };

  const decrementSets = () => {
    setSets((prev) => prev - 1);
  };
  const incrementReps = () => {
    setReps((prev) => prev + 1);
  };

  const decrementReps = () => {
    setReps((prev) => prev - 1);
  };

  const incrementRest = () => {
    setRest((prev) => prev + 1);
  };

  const decrementRest = () => {
    setRest((prev) => prev - 1);
  };

  const setDeafault = () => {
    setName('');
    setSets(1);
    setReps(1);
    setRest(60);
    setTempo('');
  };

  const onSubmit = (event) => {
    event.preventDefault();

    sessionService.loadSession()
      .then(({ token }) => {
        axios({
          method: 'post',
          url: `${apiUrl}/routines/${routineId}/exercises`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: {
            data: {
              attributes: {
                name,
                link: 'none',
                sets,
                reps,
                rest,
                tempo,
              },
            },
          },
        })
          .then(() => {
            setDeafault();
            setRefresh(1 + Math.random() * (100 - 1));
          })
          .catch(() => {
            history.push('/not-found');
          });
      })
      .catch(() => {
        history.push('/signin');
      });
  };

  return (
    <div className="routine-form">
      <form onSubmit={onSubmit}>
        <div className="routine-form__left">
          <FormInputSelect
            id="name"
            handleChange={({ target: { value } }) => setName(value)}
            value={name}
            label="Exercise"
            options={selectExercises}
          />
          <FormInputSelect
            id="tempo"
            handleChange={({ target: { value } }) => setTempo(value)}
            value={tempo}
            label="Tempo"
            options={selectTempo}
          />
        </div>
        <div className="routine-form__right">
          <div className="routine-form__right__inputs">
            <FormInputNumber
              id="sets"
              handleChange={({ target: { value } }) => setSets(value)}
              value={sets}
              increment={incrementSets}
              decrement={decrementSets}
              label="Sets"
            />
            <FormInputNumber
              id="reps"
              handleChange={({ target: { value } }) => setReps(value)}
              value={reps}
              increment={incrementReps}
              decrement={decrementReps}
              label="Reps"
            />
            <FormInputNumber
              id="rest"
              handleChange={({ target: { value } }) => setRest(value)}
              value={rest}
              increment={incrementRest}
              decrement={decrementRest}
              label="Rest(sec)"
            />
          </div>
          <input
            className="routine-form__btn-submit"
            type="submit"
          />
        </div>
      </form>
    </div>
  );
};

RoutineForm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      routineId: PropTypes.string,
    }),
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  setRefresh: PropTypes.func.isRequired,
};

export default withRouter(RoutineForm);
