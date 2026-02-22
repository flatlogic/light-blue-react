import config from '../config';
import { decodeJwt } from './jwt';

export function isAuthenticated(token = localStorage.getItem('token')) {
  if (!config.isBackend && token) {
    return true;
  }

  if (!token) {
    return false;
  }

  const payload = decodeJwt(token);
  if (!payload || !payload.exp) {
    return false;
  }

  const now = Date.now() / 1000;
  return now < payload.exp;
}
