import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import PropTypes from 'prop-types';

import { selectAuthenticated, selectUser } from '../redux/session/session.selectors';
import { logout } from '../redux/session/session.actions';

const Header = ({
  authenticated, logout, history, user: { id },
}) => (
  <header className="header">
    <div>
      <Link to="/">
        Logo
      </Link>

      <nav>
        <Link to="/daypicker">
          Calendar
        </Link>
      </nav>
    </div>
    <div>
      {authenticated ? (
        <div className="dropdown">
          <div className="dropdown__btn">
            {id}
          </div>
          <div className="dropdown__content">
            <div
              onClick={() => logout(history)}
              onKeyPress={() => {}}
              role="button"
              tabIndex={0}
            >
              SIGN OUT
            </div>
          </div>
        </div>
      ) : (
        <Link to="/signin">
          SIGN IN
        </Link>
      )}
    </div>
  </header>
);

Header.defaultProps = {
  user: { id: -1 },
};

const {
  bool, func, shape, number,
} = PropTypes;

Header.propTypes = {
  authenticated: bool.isRequired,
  logout: func.isRequired,
  history: shape({
    push: func,
  }).isRequired,
  user: shape({
    id: number,
  }),
};

const mapStateToProps = createStructuredSelector({
  authenticated: selectAuthenticated,
  user: selectUser,
});

const mapDispatchToProps = (dispatch) => ({
  logout: (history) => dispatch(logout(history)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(Header));
