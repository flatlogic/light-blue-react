import jwt from 'jsonwebtoken';

import config from '../config';

export function isAuthenticated(token = localStorage.getItem('token')) {
  if (!config.isBackend && token) {
    return true;
  }

  if (!token) {
    return false;
  }

  const payload = jwt.decode(token);
  if (!payload || !payload.exp) {
    return false;
  }

  const now = Date.now() / 1000;
  return now < payload.exp;
}
