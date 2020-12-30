import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const AccountActivationScreen = ({ match }) => {
  const [values, setValues] = useState({
    name: '',
    token: '',
    show: true,
  });

  const { name, token, show } = values;

  useEffect(() => {
    let token = match.params.token;
    let { name } = jwt.decode(token);

    if (token) {
      setValues({ ...values, name, token });
    }
  }, [match, values]);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API}/users/account-activation`,
      data: { token },
    })
      .then((response) => {
        console.log('Successfully activated user account', response);
        setValues({
          ...values,
          show: false,
        });
        toast.success(response.data.message);
      })
      .catch((error) => {
        console.log('Error activating user account', error.response.data.error);
        toast.error(error.response.data.error);
      });
  };

  return (
    <section>
      <ToastContainer />
      <header>
        <h2>Account Activation</h2>
        <h3>Welcome {name}</h3>
        <button onClick={handleSubmit} disabled={!show}>
          Activate Account
        </button>
      </header>
    </section>
  );
};

export default AccountActivationScreen;
