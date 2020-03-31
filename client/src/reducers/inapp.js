import { LOAD_INAPP, LOAD_INAPPS } from '../actions/types';

const initialState = {
  currentInapp: null,
  type: null,
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
        loading: false
      };
    case LOAD_INAPPS:
      return {
        ...state,
        ...payload,
        loading: false
      };
    default:
      return state;
  }
}
