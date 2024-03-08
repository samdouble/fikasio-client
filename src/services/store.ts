import { applyMiddleware, createStore } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { createLogger } from 'redux-logger';
import promise from 'redux-promise';
import thunk from 'redux-thunk';
import reducers from 'services/reducers';
// import { api } from 'services/tasks/newEndpoints';

let middlewares;
if (process.env.NODE_ENV === 'production') {
  middlewares = [thunk, promise];
} else {
  const logger = createLogger();
  middlewares = [thunk, promise, logger];
}

const store = configureStore({
  reducer: reducers,
  /*reducer: {
    ...reducers,
    // [api.reducerPath]: api.reducer,
  },*/
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: getDefaultMiddleware => getDefaultMiddleware()
      .concat(...middlewares)
      //.concat(api.middleware),
});

// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
// setupListeners(store.dispatch);

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
