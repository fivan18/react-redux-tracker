import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

import { selectExercisesForProgress, selectExerciseForProgress } from '../redux/exercise/exercise.selectors';

const Progress = ({ exercises, exercise: { attributes: { name } } }) => (
  <div className="progress">
    <h2 className="progress__header">{name}</h2>
    <BarChart
      width={500}
      height={300}
      data={exercises}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="day" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="sets" fill="#8884d8" />
    </BarChart>

    <BarChart
      width={500}
      height={300}
      data={exercises}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="day" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="reps" fill="#82ca9d" />
    </BarChart>
  </div>
);

const {
  string, number, arrayOf, shape,
} = PropTypes;

Progress.propTypes = {
  exercises: arrayOf(
    shape({
      day: string,
      sets: number,
      reps: number,
    }),
  ).isRequired,
  exercise: shape({
    attributes: shape({
      name: string,
    }),
  }).isRequired,
};

const mapStateToProps = createStructuredSelector({
  exercises: selectExercisesForProgress,
  exercise: selectExerciseForProgress,
});

export default connect(
  mapStateToProps,
  null,
)(Progress);
