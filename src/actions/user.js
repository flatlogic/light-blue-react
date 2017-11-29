import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
} from '../constants';

function requestLogin(creds) {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    creds,
  };
}

export function receiveLogin(user) {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    id_token: user.id_token,
  };
}

function loginError(message) {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message,
  };
}

function requestLogout() {
  return {
    type: LOGOUT_REQUEST,
    isFetching: true,
    isAuthenticated: true,
  };
}

export function receiveLogout() {
  return {
    type: LOGOUT_SUCCESS,
    isFetching: false,
    isAuthenticated: false,
  };
}

// Logs the user out
export function logoutUser() {
  return (dispatch) => {
    dispatch(requestLogout());
    localStorage.removeItem('id_token');
    document.cookie = 'id_token=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    dispatch(receiveLogout());
  };
}

export function loginUser(creds) {
  const config = {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    credentials: 'include',
    body: `login=${creds.login}&password=${creds.password}`,
  };

  return (dispatch) => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestLogin(creds));

    return fetch('/login', config)
      .then(response =>
        response.json().then(user => ({ user, response })),
      ).then(({ user, response }) => {
        if (!response.ok) {
          // If there was a problem, we want to
          // dispatch the error condition
          dispatch(loginError(user.message));
          return Promise.reject(user);
        }
        // in posts create new action and check http status, if malign logout
        // If login was successful, set the token in local storage
        localStorage.setItem('id_token', user.id_token);
          // Dispatch the success action
        dispatch(receiveLogin(user));
        return 0;
      }).catch(err => console.log('Error: ', err)); // eslint-disable-line
  };
}
