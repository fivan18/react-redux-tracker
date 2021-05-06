import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { openRoutineDay } from '../redux/session/session.actions';

const Homepage = ({
  history, openRoutineDay,
}) => {
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      const day = new Date(Date.now());
      openRoutineDay(day, history);
    }

    // eslint-disable-next-line no-return-assign
    return () => mounted = false;
  }, []);

  return (
    <div />
  );
};

const { shape, func } = PropTypes;

Homepage.propTypes = {
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
)(withRouter(Homepage));
