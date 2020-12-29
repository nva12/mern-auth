import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const SignInScreen = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
    buttonText: 'Submit',
  });

  const { email, password, buttonText } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, buttonText: 'Submitting...' });
    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API}/users/signin`,
      data: { email, password },
    })
      .then((response) => {
        console.log('Successfully signed in user', response);

        setValues({
          ...values,
          email: '',
          password: '',
          buttonText: 'Submitted',
        });
        toast.success(
          `Hello ${response.data.user.name}, you are now signed in!`
        );
      })
      .catch((error) => {
        console.log('Error signing in user', error.response.data);
        setValues({
          ...values,
          buttonText: 'Submit',
        });
        toast.error(error.response.data.error);
      });
  };

  return (
    <section>
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <header>
          <h2>Sign In</h2>
        </header>
        <label for='email'>Email:</label>
        <input
          type='email'
          id='email'
          name='email'
          value={email}
          placeholder='Email'
          onChange={handleChange('email')}
        />
        <label for='password'>Password:</label>
        <input
          type='password'
          id='password'
          name='password'
          value={password}
          placeholder='Password'
          onChange={handleChange('password')}
        />
        <button type='submit' disabled={buttonText !== 'Submit'}>
          {buttonText}
        </button>
      </form>
    </section>
  );
};

export default SignInScreen;
