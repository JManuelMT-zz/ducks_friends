import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from './reducers';

const middlewares = [thunkMiddleware, createLogger()];
const store = createStore(
    rootReducer,
    applyMiddleware(...middlewares),
);

export default store;
