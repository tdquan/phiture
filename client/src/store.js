import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import rootReducer from './reducers';

const middlewares = [thunk];
const composedEnhancers = applyMiddleware(...middlewares);

const store = createStore(
  rootReducer,
  composeWithDevTools(composedEnhancers)
);

export default store;
