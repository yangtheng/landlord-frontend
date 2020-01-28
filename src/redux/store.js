import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import reducers from './modules/reducer';

let loggerMiddleware;
if (process.env.NODE_ENV !== 'production') loggerMiddleware = createLogger();

let middleware = [thunkMiddleware];

if (process.env.NODE_ENV !== 'production') {
  middleware = [...middleware, loggerMiddleware];
}

export default createStore(
  reducers,
  applyMiddleware(
    ...middleware,
  ),
);
