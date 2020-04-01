import {
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOAD_USER,
  AUTH_FAIL
} from './types';
import { setAlert } from './alert';
import setAuthHeaders from '../utils/setAuthorization';

export const loadUser = () => async dispatch => {
  let headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  };
  if (localStorage.phiture_token) {
    headers = setAuthHeaders(headers);
  }
  const config = {
    method: 'GET',
    headers: headers
  }

  try {
    const res = await fetch('/auth', config);
    res.json()
      .then(data => {
        if (res.status >= 200 && res.status < 400) {
          dispatch({
            type: LOAD_USER,
            payload: data
          })
        } else {
          const err = new Error(data.statusText);
          err.code = data.status;
          throw err;
        }
      })
      .catch(err => {
        dispatch({ type: AUTH_FAIL });
      });
  } catch(e) {
    dispatch(setAlert('You are not signed-in, please sign-in again', 'danger'));
    dispatch({ type: AUTH_FAIL });
  }
}

export const signUp = ({ email, password }) => async dispatch => {
  const newUser = { user: { email, password } };

  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(newUser)
  };
  const url = '/signup';

  const res = await fetch(url, config);
  try {
    res.json()
      .then(data => {
        if (res.status >= 200 && res.status < 400) {
          let payload = {};
          payload.token = res.headers.get('Authorization');
          payload.user = data;
          dispatch({
            type: SIGNUP_SUCCESS,
            payload: payload
          });
          dispatch(setAlert('You are signed-up', 'success'));
        } else {
          const err = new Error();
          err.code = data.status;
          err.response = data.errors[0].details;
          throw err;
        }
      })
      .catch(err => {
        const key = Object.keys(err.response)[0];
        const value = Object.values(err.response)[0];
        dispatch(setAlert(`${key}: ${value}`, 'danger'));
        dispatch({ type: SIGNUP_FAIL });
      })
  } catch(err) {
    console.log(err);
  }
}

export const logIn = ({ email, password }) => async dispatch => {
  const user = { user: { email, password } };

  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(user)
  };
  const url = '/login';

  const res = await fetch(url, config);
  try {
    res.json()
      .then(data => {
        if (res.status >= 200 && res.status < 400) {
          let payload = {};
          payload.token = res.headers.get('Authorization');
          payload.user = data;
          dispatch({
            type: LOGIN_SUCCESS,
            payload: payload
          });
          dispatch(setAlert('Successfully signed-in', 'success'));
        } else {
          const err = new Error();
          err.code = data.status;
          err.response = data.errors[0].details;
          throw err;
        }
      })
      .catch(err => {
        const key = Object.keys(err.response)[0];
        const value = Object.values(err.response)[0];
        dispatch(setAlert(`${key}: ${value}`, 'danger'));
        dispatch({ type: LOGIN_FAIL });
      })
  } catch(err) {
    console.log(err);
  }
}
