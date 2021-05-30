/** @format */

import React from 'react';
import { useSelector } from 'react-redux';

import { Route, Redirect } from 'react-router-dom';
import Login from '../pages/Login';

const PrivateRoute: React.FC<any> = ({ children, ...rest }) => {
  const { user } = useSelector((state: any) => state.auth);
  return (
    <Route
      {...rest}
      render={() => {
        return user ? (
          children
        ) : (
          <>
            <Redirect to="/login" />
            <Login />
          </>
        );
      }}
    />
  );
};

export default PrivateRoute;
