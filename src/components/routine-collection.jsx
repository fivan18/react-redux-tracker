import React from 'react';
import PropTypes from 'prop-types';
import { sessionService } from 'redux-react-session';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { addExercises } from '../redux/exercise/exercise.actions';

const ExerciseCollection = ({
  exercises, addExercises, history,
}) => {
  const handleClick = (name) => {
    sessionService.loadSession()
      .then(({ token }) => {
        axios({
          method: 'get',
          url: `http://localhost:3000/progress/${name}`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then(({ data: { data } }) => {
            addExercises(data);
            history.push('/progress');
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
      {exercises.map(({
        id,
        attributes: {
          name,
          link,
          sets,
          reps,
          rest,
          tempo,
        },
      }) => (
        <div
          onClick={() => handleClick(name)}
          onKeyPress={() => {}}
          role="link"
          tabIndex={0}
          key={id}
        >
          <div>{name}</div>
          <div>{link}</div>
          <div>{sets}</div>
          <div>{reps}</div>
          <div>{rest}</div>
          <div>{tempo}</div>
        </div>
      ))}
    </div>
  );
};

const {
  string, number, func, arrayOf, shape,
} = PropTypes;

ExerciseCollection.propTypes = {
  exercises: arrayOf(
    shape({
      id: string,
      attributes: shape({
        name: string,
        link: string,
        sets: number,
        reps: number,
        rest: number,
        tempo: string,
      }),
    }),
  ).isRequired,
  addExercises: func.isRequired,
  history: shape({
    push: func,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  addExercises: (exercises) => dispatch(addExercises(exercises)),
});

export default connect(
  null,
  mapDispatchToProps,
)(withRouter(ExerciseCollection));
