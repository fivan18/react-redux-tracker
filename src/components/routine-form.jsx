import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { sessionService } from 'redux-react-session';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

import FormInputText from './form-input-text';
import FormInputNumber from './form-input-number';

const RoutineForm = ({ match: { params: { routineId } }, history, setRefresh }) => {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  const [sets, setSets] = useState(1);
  const [reps, setReps] = useState(1);
  const [rest, setRest] = useState(60);
  const [tempo, setTempo] = useState('');

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
    setLink('');
    setSets(0);
    setReps(0);
    setRest(0);
    setTempo('');
  };

  const onSubmit = (event) => {
    event.preventDefault();

    sessionService.loadSession()
      .then(({ token }) => {
        axios({
          method: 'post',
          url: `http://localhost:3000/routines/${routineId}/exercises`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: {
            data: {
              attributes: {
                name,
                link,
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
          <FormInputText
            id="name"
            componentClassName="routine-form"
            handleChange={({ target: { value } }) => setName(value)}
            value={name}
            label="Name"
          />
          <FormInputText
            id="link"
            componentClassName="routine-form"
            handleChange={({ target: { value } }) => setLink(value)}
            value={link}
            label="Link"
          />
          <FormInputText
            id="tempo"
            componentClassName="routine-form"
            handleChange={({ target: { value } }) => setTempo(value)}
            value={tempo}
            label="Tempo"
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
