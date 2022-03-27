import { createStore,compose,applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

const composer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//el thunk recibe las actions-creators que son functions
const middleware = [thunk];

const store = createStore(
  rootReducer,
  composer(applyMiddleware(...middleware))
)

export default store;
