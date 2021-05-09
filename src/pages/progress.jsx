import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

import { selectExercises } from '../redux/exercise/exercise.selectors';

const Progress = ({ exercises }) => (
  <div>
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

Progress.propTypes = {
  exercises: PropTypes.arrayOf(
    PropTypes.shape({
      day: PropTypes.string,
      sets: PropTypes.number,
      reps: PropTypes.number,
    }),
  ).isRequired,
};

const mapStateToProps = createStructuredSelector({
  exercises: selectExercises,
});

export default connect(
  mapStateToProps,
  null,
)(Progress);
