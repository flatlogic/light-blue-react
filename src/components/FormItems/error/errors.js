import { toast } from 'react-toastify';
import { push } from 'actions/navigation';
import { store } from '../../../store';

/* global __APP_ENV__ */

const DEFAULT_ERROR_MESSAGE = 'Error';
const appEnv = typeof __APP_ENV__ !== 'undefined' ? __APP_ENV__ : {};
const runtimeNodeEnv =
  appEnv.NODE_ENV || (typeof process !== 'undefined' && process.env ? process.env.NODE_ENV : undefined);

function selectErrorMessage(error) {
  if (error && error.response && error.response.data) {
    const data = error.response.data;

    if (data.error && data.error.message) {
      return data.error.message;
    }

    return String(data);
  }

  return error.message || DEFAULT_ERROR_MESSAGE;
}

function selectErrorCode(error) {
  if (error && error.response && error.response.status) {
    return error.response.status;
  }

  return 500;
}

export default class Errors {
  static handle(error) {
    if (runtimeNodeEnv !== 'test') {
      console.error(selectErrorMessage(error));
      console.error(error);
    }

    if (selectErrorCode(error) === 403) {
      store.dispatch(push('/403'));
      return;
    }

    if (selectErrorCode(error) === 400) {
      toast.error(selectErrorMessage(error));
      return;
    }

    store.dispatch(push('/500'));
  }

  static errorCode(error) {
    return selectErrorCode(error);
  }

  static selectMessage(error) {
    return selectErrorMessage(error);
  }

  static showMessage(error) {
    toast.error(selectErrorMessage(error));
  }
}
