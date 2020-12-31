import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuthState } from '../context';

const PrivateRoute = ({ component: Component, ...rest }) => {
  let auth = useAuthState();

  return (
    <Route
      {...rest}
      render={(props) =>
        auth.token ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/signin',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
