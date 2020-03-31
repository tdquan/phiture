import {
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOAD_USER,
  AUTH_FAIL
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('phiture_token'),
  isAuthenticated: null,
  loading: true,
  user: null
};

export default (state=initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SIGNUP_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('phiture_token', payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      }
    case LOAD_USER:
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      }
    case SIGNUP_FAIL:
    case LOGIN_FAIL:
    case AUTH_FAIL:
      localStorage.removeItem('phiture_token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false
      }
    default:
      return state;
  }
}
