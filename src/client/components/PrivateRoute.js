import React from 'react';
import { Route } from 'react-router-dom';
import { useUser } from './user-context';
import SignIn from './SignIn';

const PrivateRoute = ({ path, component }) => {
  const { user } = useUser();

  if (!user) return <Route path={path} component={SignIn} />;

  return <Route path={path} component={component} />;
};

export default PrivateRoute;
