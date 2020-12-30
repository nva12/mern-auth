import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { signinUser, useAuthState, useAuthDispatch } from '../context';

const SignInScreen = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const { email, password } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const dispatch = useAuthDispatch();
  const { loading, errorMessage } = useAuthState();

  let history = useHistory();

  const handleSignin = async (e) => {
    e.preventDefault();

    let payload = { email, password };

    try {
      let response = await signinUser(dispatch, payload);

      if (!response.user) return;

      history.push('/');
    } catch (error) {
      console.log('Error signing in user', error);
    }
  };

  return (
    <>
      {errorMessage && (
        <>
          <article>
            <aside>
              <p>{errorMessage}</p>
            </aside>
          </article>
          <br />
        </>
      )}

      <section>
        <form onSubmit={handleSignin}>
          <header>
            <h2>Sign In</h2>
          </header>
          <label htmlFor='email'>Email:</label>
          <input
            type='email'
            id='email'
            name='email'
            value={email}
            placeholder='Email'
            onChange={handleChange('email')}
          />
          <label htmlFor='password'>Password:</label>
          <input
            type='password'
            id='password'
            name='password'
            value={password}
            placeholder='Password'
            onChange={handleChange('password')}
          />
          <button type='submit' disabled={loading}>
            Sign In
          </button>
        </form>
      </section>
    </>
  );
};

export default SignInScreen;
