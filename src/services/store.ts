import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { createLogger } from 'redux-logger';
import promise from 'redux-promise';
import thunk from 'redux-thunk';
import reducers from 'services/reducers';
import { apiEvents } from 'services/events/api';
import { apiObjectives } from './objectives/api';
import { apiOrganizations } from './organizations/api';
import { apiProjects } from 'services/projects/api';
import { apiTasks } from 'services/tasks/api';

let middlewares;
if (process.env.NODE_ENV === 'production') {
  middlewares = [thunk, promise];
} else {
  const logger = createLogger();
  middlewares = [thunk, promise, logger];
}

const store = configureStore({
  reducer: combineReducers({
    ...reducers,
    [apiEvents.reducerPath]: apiEvents.reducer,
    [apiObjectives.reducerPath]: apiObjectives.reducer,
    [apiOrganizations.reducerPath]: apiOrganizations.reducer,
    [apiProjects.reducerPath]: apiProjects.reducer,
    [apiTasks.reducerPath]: apiTasks.reducer,
  }),
  devTools: process.env.NODE_ENV !== 'production',
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(
        ...middlewares,
        apiEvents.middleware,
        apiObjectives.middleware,
        apiOrganizations.middleware,
        apiProjects.middleware,
        apiTasks.middleware,
      ),
});

// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
