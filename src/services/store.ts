import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import promise from 'redux-promise';
import thunk from 'redux-thunk';
import reducers from 'services/reducers';

let middlewares;
if (process.env.NODE_ENV === 'production') {
  middlewares = [thunk, promise];
} else {
  const logger = createLogger();
  middlewares = [thunk, promise, logger];
}

const store = createStore(reducers, applyMiddleware(...middlewares));

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
