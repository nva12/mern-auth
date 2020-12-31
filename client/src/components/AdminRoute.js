import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuthState } from '../context';

const AdminRoute = ({ component: Component, ...rest }) => {
  let auth = useAuthState();

  return (
    <Route
      {...rest}
      render={(props) =>
        auth.token && auth.userDetails.role === 'admin' ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default AdminRoute;
