import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

import FormInput from '../components/form-input';
import SubmitButton from '../components/submit-button';
import { apiUrl } from '../utilities/utils';

const SignUp = ({ history }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password === confirmPassword) {
      axios({
        method: 'post',
        url: `${apiUrl}/sign_up`,
        data: {
          data: {
            attributes: {
              username,
              password,
            },
          },
        },
      })
        .then(() => {
          history.push('/signin');
        })
        .catch(() => {
          history.push('/not-found');
        });
    }
  };

  const handleUsernameChange = (event) => {
    const { value } = event.target;
    setUsername(value);
  };

  const handlePasswordChange = (event) => {
    const { value } = event.target;
    setPassword(value);
  };

  const handleConfirmPassword = (event) => {
    const { value } = event.target;
    setConfirmPassword(value);
  };

  return (
    <div className="sign-in-up__container">
      <div className="sign-in-up__card">
        <h2 className="sign-in-up__card-title">Sign Up</h2>
        <span className="sign-in-up__card-subtitle">Enter your username and password</span>

        <form className="sign-in-up__card-form" onSubmit={handleSubmit}>
          <FormInput
            id="username"
            name="username"
            type="username"
            handleChange={handleUsernameChange}
            value={username}
            placeholder="username"
          />
          <FormInput
            id="password"
            name="password"
            type="password"
            value={password}
            handleChange={handlePasswordChange}
            placeholder="password"
          />

          <FormInput
            id="confirm-password"
            name="confirmPassword"
            type="password"
            handleChange={handleConfirmPassword}
            value={confirmPassword}
            placeholder="confirm password"
          />

          <div>
            <SubmitButton> Sign up </SubmitButton>
          </div>
        </form>
      </div>
    </div>
  );
};

SignUp.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default withRouter(SignUp);
