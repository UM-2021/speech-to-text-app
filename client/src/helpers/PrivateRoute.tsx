/** @format */

import React from 'react';
import { useSelector } from 'react-redux';

import { Route, Redirect } from 'react-router-dom';

const PrivateRoute: React.FC<any> = ({ children, ...rest }) => {
  const { user } = useSelector((state: any) => state.auth);
  return (
    <Route
      {...rest}
      render={({ location }) => {
        return user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: {
                from: location
              }
            }}
          />
        );
      }}
    />
  );
};

export default PrivateRoute;
