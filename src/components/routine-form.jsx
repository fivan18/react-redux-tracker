import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { sessionService } from 'redux-react-session';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

const RoutineForm = ({ match: { params: { routineId } }, history, setRefresh }) => {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  const [sets, setSets] = useState(0);
  const [reps, setReps] = useState(0);
  const [rest, setRest] = useState(0);
  const [tempo, setTempo] = useState('');

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
    <div>
      <form onSubmit={onSubmit}>
        <input
          name="name"
          type="text"
          onChange={({ target: { value } }) => setName(value)}
          value={name}
          placeholder="Name"
          required
        />
        <input
          name="link"
          type="text"
          onChange={({ target: { value } }) => setLink(value)}
          value={link}
          placeholder="Link"
        />
        <input
          name="sets"
          type="number"
          onChange={({ target: { value } }) => setSets(value)}
          value={sets}
          required
        />
        <input
          name="reps"
          type="number"
          onChange={({ target: { value } }) => setReps(value)}
          value={reps}
          required
        />
        <input
          name="rest"
          type="number"
          onChange={({ target: { value } }) => setRest(value)}
          value={rest}
          required
        />
        <input
          name="tempo"
          type="text"
          onChange={({ target: { value } }) => setTempo(value)}
          value={tempo}
          placeholder="Tempo"
          required
        />
        <input
          type="submit"
        />
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
