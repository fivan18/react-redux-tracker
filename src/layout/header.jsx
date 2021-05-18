import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import PropTypes from 'prop-types';

import { selectAuthenticated, selectUser } from '../redux/session/session.selectors';
import { logout } from '../redux/session/session.actions';

const Header = ({
  authenticated, logout, history, user: { username },
}) => {
  const [hidden, setHidden] = useState(true);

  return (
    <div>
      <header className="header">
        <div className="header__right-side">
          <Link className="header__logo" to="/">
            Track.it
          </Link>

          <nav className="header__nav">
            <Link className="header__nav__item" to="/daypicker">
              Calendar
            </Link>
          </nav>
        </div>
        <div className="header__left-side">
          {authenticated ? (
            <div className="dropdown">
              <div className="dropdown__btn">
                {username}
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
            <Link className="header__signin" to="/signin">
              SIGN IN
            </Link>
          )}
          <div
            className="header__navigation__button"
            onClick={() => setHidden((hidden) => !hidden)}
            onKeyPress={() => {}}
            role="button"
            tabIndex={0}
          >
            <span className="header__navigation__icon">&nbsp;</span>
          </div>
        </div>
      </header>
      <nav className={`header__nav__responsive ${hidden ? 'hidden' : ''}`}>
        <Link className="header__nav__responsive__item" to="/daypicker">
          Calendar
        </Link>
        {authenticated ? (
          <div
            className="header__nav__responsive__item"
            onClick={() => logout(history)}
            onKeyPress={() => {}}
            role="button"
            tabIndex={0}
          >
            SIGN OUT
          </div>
        ) : (
          <Link className="header__nav__responsive__item" to="/signin">
            SIGN IN
          </Link>
        )}
      </nav>
    </div>
  );
};

Header.defaultProps = {
  user: { username: '' },
};

const {
  bool, func, shape, string,
} = PropTypes;

Header.propTypes = {
  authenticated: bool.isRequired,
  logout: func.isRequired,
  history: shape({
    push: func,
  }).isRequired,
  user: shape({
    username: string,
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
