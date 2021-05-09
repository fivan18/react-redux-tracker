import React from 'react';
import PropTypes from 'prop-types';
import Calendar from 'react-calendar';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { openRoutineDay } from '../redux/session/session.actions';

const Daypicker = ({ history, openRoutineDay }) => {
  const onClickDay = (day) => {
    openRoutineDay(day, history);
  };

  return (
    <Calendar
      onClickDay={onClickDay}
    />
  );
};

const { shape, func } = PropTypes;

Daypicker.propTypes = {
  history: shape({
    push: func,
  }).isRequired,
  openRoutineDay: func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  openRoutineDay: (day, history) => dispatch(openRoutineDay(day, history)),
});

export default connect(
  null,
  mapDispatchToProps,
)(withRouter(Daypicker));
