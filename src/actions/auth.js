import axios from 'axios';
import jwt from 'jsonwebtoken';
import { toast } from 'react-toastify';

import config from '../config';
import { push } from 'actions/navigation';
import Errors from '../components/FormItems/error/errors';
import { mockUser } from './mock';
import {
  fetchCurrentUser,
  requestPasswordReset,
  resetPasswordWithToken,
  signInLocal,
  signUp,
  verifyEmailToken,
} from '../services/authService';

export const AUTH_FAILURE = 'AUTH_FAILURE';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const RESET_REQUEST = 'RESET_REQUEST';
export const RESET_SUCCESS = 'RESET_SUCCESS';
export const PASSWORD_RESET_EMAIL_REQUEST = 'PASSWORD_RESET_EMAIL_REQUEST';
export const PASSWORD_RESET_EMAIL_SUCCESS = 'PASSWORD_RESET_EMAIL_SUCCESS';
export const AUTH_INIT_SUCCESS = 'AUTH_INIT_SUCCESS';
export const AUTH_INIT_ERROR = 'AUTH_INIT_ERROR';
export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';

function getAuthErrorMessage(error) {
  return Errors.selectMessage(error);
}

export function authError(payload) {
  return {
    type: AUTH_FAILURE,
    payload,
  };
}

export function doInit() {
  return async (dispatch) => {
    if (!config.isBackend) {
      dispatch({
        type: AUTH_INIT_SUCCESS,
        payload: {
          currentUser: mockUser,
        },
      });
      return;
    }

    try {
      let currentUser = null;
      const token = localStorage.getItem('token');
      if (token) {
        currentUser = await fetchCurrentUser();
      }
      dispatch({
        type: AUTH_INIT_SUCCESS,
        payload: {
          currentUser,
        },
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: AUTH_INIT_ERROR,
        payload: error,
      });
    }
  };
}

export function logoutUser() {
  return (dispatch) => {
    dispatch({
      type: LOGOUT_REQUEST,
    });
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    axios.defaults.headers.common.Authorization = '';
    dispatch({
      type: LOGOUT_SUCCESS,
    });

    dispatch(push('/login'));
  };
}

export function receiveToken(token) {
  return (dispatch) => {
    const user = config.isBackend
      ? jwt.decode(token)
      : {
          email: config.auth.email,
          user: {
            id: 'default_no_connection_id_444',
          },
        };

    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    dispatch({
      type: LOGIN_SUCCESS,
    });

    dispatch(push('/app'));
  };
}

export function loginUser(creds) {
  return async (dispatch) => {
    if (!config.isBackend) {
      dispatch(receiveToken('token'));
      dispatch(doInit());
      return;
    }

    dispatch({
      type: LOGIN_REQUEST,
    });

    if (creds.social) {
      window.location.href = `${config.baseURLApi}/auth/signin/${creds.social}?app=${config.redirectUrl}`;
      return;
    }

    if (!creds.email || !creds.password) {
      dispatch(authError('Something was wrong. Try again'));
      return;
    }

    try {
      const token = await signInLocal(creds);
      dispatch(receiveToken(token));
      dispatch(doInit());
    } catch (error) {
      dispatch(authError(getAuthErrorMessage(error)));
    }
  };
}

export function verifyEmail(token) {
  return async (dispatch) => {
    if (!config.isBackend) {
      dispatch(push('/login'));
      return;
    }

    try {
      await verifyEmailToken(token);
      toast.success('Your email was verified');
    } catch (error) {
      toast.error(getAuthErrorMessage(error));
    } finally {
      dispatch(push('/login'));
    }
  };
}

export function resetPassword(token, password) {
  return async (dispatch) => {
    if (!config.isBackend) {
      dispatch(push('/login'));
      return;
    }

    dispatch({
      type: RESET_REQUEST,
    });

    try {
      await resetPasswordWithToken(token, password);
      dispatch({
        type: RESET_SUCCESS,
      });
      toast.success('Password has been updated');
      dispatch(push('/login'));
    } catch (error) {
      dispatch(authError(getAuthErrorMessage(error)));
    }
  };
}

export function sendPasswordResetEmail(email) {
  return async (dispatch) => {
    if (!config.isBackend) {
      dispatch(push('/login'));
      return;
    }

    dispatch({
      type: PASSWORD_RESET_EMAIL_REQUEST,
    });

    try {
      await requestPasswordReset(email);
      dispatch({
        type: PASSWORD_RESET_EMAIL_SUCCESS,
      });
      toast.success('Email with resetting instructions has been sent');
      dispatch(push('/login'));
    } catch (error) {
      dispatch(authError(getAuthErrorMessage(error)));
    }
  };
}

export function registerUser(creds) {
  return async (dispatch) => {
    if (!config.isBackend) {
      dispatch(push('/login'));
      return;
    }

    dispatch({
      type: REGISTER_REQUEST,
    });

    if (!creds.email || !creds.password) {
      dispatch(authError('Something was wrong. Try again'));
      return;
    }

    try {
      await signUp(creds);
      dispatch({
        type: REGISTER_SUCCESS,
      });
      toast.success("You've been registered successfully. Please check your email for verification link");
      dispatch(push('/login'));
    } catch (error) {
      dispatch(authError(getAuthErrorMessage(error)));
    }
  };
}
