import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import inapp from './inapp';

export default combineReducers({
  alert,
  auth,
  inapp
});
