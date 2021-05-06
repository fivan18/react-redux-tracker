import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import PropTypes from 'prop-types';

import { selectAuthenticated } from '../redux/session/session.selectors';
import { logout } from '../redux/session/session.actions';

const Header = ({ authenticated, logout, history }) => (
  <div className="header">
    <Link to="/">
      Logo
    </Link>
    <div>
      {authenticated ? (
        <div
          onClick={() => logout(history)}
          onKeyPress={() => {}}
          role="button"
          tabIndex={0}
        >
          SIGN OUT
        </div>
      ) : (
        <Link to="/signin">
          SIGN IN
        </Link>
      )}
    </div>
  </div>
);

Header.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = createStructuredSelector({
  authenticated: selectAuthenticated,
});

const mapDispatchToProps = (dispatch) => ({
  logout: (history) => dispatch(logout(history)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(Header));
