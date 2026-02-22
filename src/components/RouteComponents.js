import React from 'react';
import { Navigate } from 'react-router-dom';

import { logoutUser } from '../actions/auth';
import { isAuthenticated } from '../core/auth';

export function AdminRoute({ currentUser, children }) {
  if (
    !currentUser
    || currentUser.role !== 'admin'
    || !isAuthenticated(localStorage.getItem('token'))
  ) {
    return <Navigate to="/app/main" replace />;
  }

  return children;
}

export function UserRoute({ dispatch, children }) {
  if (!isAuthenticated()) {
    dispatch(logoutUser());
    return <Navigate to="/login" replace />;
  }

  return children;
}

export function AuthRoute({ children, from }) {
  const target = from || { pathname: '/app' };

  if (isAuthenticated()) {
    return <Navigate to={target} replace />;
  }

  return children;
}
