import React from 'react';
import PropTypes from 'prop-types';
import { sessionService } from 'redux-react-session';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { addExercises } from '../redux/exercise/exercise.actions';
import { apiUrl } from '../utilities/utils';

const ExerciseCollection = ({
  exercises, addExercises, history,
}) => {
  const handleClick = (name) => {
    sessionService.loadSession()
      .then(({ token }) => {
        axios({
          method: 'get',
          url: `${apiUrl}/progress/${name}`,
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
    <div className="routine-collection">
      {exercises.map(({
        id,
        attributes: {
          name,
          sets,
          reps,
          rest,
          tempo,
        },
      }) => (
        <div
          className="routine-collection__item"
          onClick={() => handleClick(name)}
          onKeyPress={() => {}}
          role="link"
          tabIndex={0}
          key={id}
        >
          <div>
            {`${name} (${tempo})`}
          </div>
          <div>
            {sets}
            &rarr;
            {`${reps} with ${rest} sec. rest time`}
          </div>
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
