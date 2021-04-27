import React, { useState } from 'react';
import axios from 'axios';

import FormInput from '../components/form-input';
import SubmitButton from '../components/submit-button';

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    axios({
      method: 'post',
      url: 'http://localhost:3000/login',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
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

      })
      .catch(() => {

      });
  };

  const handleUsernameChange = (event) => {
    const { value } = event.target;
    setUsername(value);
  };

  const handlePasswordChange = (event) => {
    const { value } = event.target;
    setPassword(value);
  };

  return (
    <div className="sign-in">
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput
          name="username"
          type="username"
          handleChange={handleUsernameChange}
          value={username}
          placeholder="username"
        />
        <FormInput
          name="password"
          type="password"
          value={password}
          handleChange={handlePasswordChange}
          placeholder="password"
        />
        <div>
          <SubmitButton> Sign in </SubmitButton>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
