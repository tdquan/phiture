import { LOAD_INAPP, LOAD_INAPPS, ADD_BUTTON, INAPP_CREATED, LOADED } from '../actions/types';

const initialState = {
  currentInapp: null,
  type: null,
  buttons: [],
  inapps: [],
  loading: true,
  error: {}
}

export default (state=initialState, action) => {
  const { type, payload } = action;
  switch(type) {
    case LOAD_INAPP:
      return {
        ...state,
        ...payload,
        loading: true
      };
    case LOAD_INAPPS:
      return {
        ...state,
        ...payload,
        loading: true
      };
    case ADD_BUTTON:
      return {
        ...state,
        buttons:[...state.buttons, payload],
        loading: true
      };
    case INAPP_CREATED:
      return {
        ...state,
        loading: false
      }
    case LOADED:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
}
