import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const SignUpScreen = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    buttonText: 'Submit',
  });

  const { name, email, password, buttonText } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, buttonText: 'Submitting...' });
    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API}/users/signup`,
      data: { name, email, password },
    })
      .then((response) => {
        console.log('Successfully signed up user', response);
        setValues({
          ...values,
          name: '',
          email: '',
          password: '',
          buttonText: 'Submitted',
        });
        toast.success(response.data.message);
      })
      .catch((error) => {
        console.log('Error signing up user', error.response.data);
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
          <h2>Sign Up</h2>
        </header>
        <label for='name'>Name:</label>
        <input
          type='text'
          id='name'
          name='name'
          value={name}
          placeholder='Name'
          onChange={handleChange('name')}
        />
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

export default SignUpScreen;
