import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from './reducers';


const middlewares = [thunkMiddleware, createLogger()];
const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middlewares)),
);

export default store;
