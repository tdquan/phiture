import { LOAD_INAPP, ADD_BUTTON, LOAD_INAPPS, INAPP_CREATED, LOADED } from './types';
import { setAlert } from './alert';
import setAuthHeaders from '../utils/setAuthorization';
import { button as newButton } from '../shared/constants';

export const setLoaded = () => async dispatch => {
  dispatch({
    type: LOADED
  });
}

export const loadInapp = (id) => async dispatch => {
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
  const url = `/types/${id}/edit`;

  const res = await fetch(url, config);

  res.json()
    .then(data => {
      dispatch({
        type: LOAD_INAPP,
        payload: { currentInapp: data.inapp, type: data.type, buttons: data.buttons }
      })
    })
}

export const loadInapps = () => async dispatch => {
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
  const url = '/types';

  const res = await fetch(url, config);
  res.json()
    .then(data => {
      if (res.status >= 200 && res.status < 400) {
        dispatch({
          type: LOAD_INAPPS,
          payload: { inapps: data }
        });
      } else {
        const err = new Error();
        throw err;
      }
    })
    .catch(err => dispatch(setAlert('Could not fetch inapps', 'danger')));
}

export const addButton = () => async dispatch => {
  dispatch({
    type: ADD_BUTTON,
    payload: newButton
  });
  dispatch({
    type: LOADED
  });
}

export const createInapp = (data, props) => async dispatch => {
  let headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  };
  if (localStorage.phiture_token) {
    headers = setAuthHeaders(headers);
  }
  const config = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(data)
  };
  const url = '/types';

  const res = await fetch(url, config);

  res.json()
    .then(data => {
      if (res.status >= 200 && res.status < 400) {
        dispatch({
          type: INAPP_CREATED
        });
        dispatch(setAlert(data.success, 'success'));
      } else {
        const err = new Error('Failed to create inapp');
        throw err;
      }
    })
    .catch(err => {
      console.log(err);
    })
}
