import React from 'react';
import PropTypes from 'prop-types';

const ExerciseCollection = ({ exercises }) => (
  <ul>
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
      <li key={id}>
        <div>{name}</div>
        <div>{link}</div>
        <div>{sets}</div>
        <div>{reps}</div>
        <div>{rest}</div>
        <div>{tempo}</div>
      </li>
    ))}
  </ul>
);

ExerciseCollection.propTypes = {
  exercises: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      attributes: PropTypes.shape({
        name: PropTypes.string,
        link: PropTypes.string,
        sets: PropTypes.number,
        reps: PropTypes.number,
        rest: PropTypes.number,
        tempo: PropTypes.string,
      }),
    }),
  ).isRequired,
};

export default ExerciseCollection;
