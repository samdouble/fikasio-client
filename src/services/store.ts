import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { createLogger } from 'redux-logger';
import promise from 'redux-promise';
import thunk from 'redux-thunk';
import { apiActivities } from 'services/activities/api';
import { apiEntities } from 'services/entities/api';
import { apiEvents } from 'services/events/api';
import { apiItems } from 'services/items/api';
import { apiLogin } from 'services/login/api';
import loginReducer from 'services/login/slice';
import { apiObjectives } from 'services/objectives/api';
import { apiOrganizations } from 'services/organizations/api';
import paneReducer from 'services/pane/slice';
import { apiPayments } from 'services/payments/api';
import { apiProjects } from 'services/projects/api';
import { apiTasks } from 'services/tasks/api';
import { apiTemplates } from 'services/templates/api';

let middlewares;
if (process.env.NODE_ENV === 'production') {
  middlewares = [thunk, promise];
} else {
  const logger = createLogger();
  middlewares = [thunk, promise, logger];
}

const store = configureStore({
  reducer: combineReducers({
    auth: loginReducer,
    pane: paneReducer,
    [apiActivities.reducerPath]: apiActivities.reducer,
    [apiEntities.reducerPath]: apiEntities.reducer,
    [apiEvents.reducerPath]: apiEvents.reducer,
    [apiItems.reducerPath]: apiItems.reducer,
    [apiLogin.reducerPath]: apiLogin.reducer,
    [apiObjectives.reducerPath]: apiObjectives.reducer,
    [apiOrganizations.reducerPath]: apiOrganizations.reducer,
    [apiPayments.reducerPath]: apiPayments.reducer,
    [apiProjects.reducerPath]: apiProjects.reducer,
    [apiTasks.reducerPath]: apiTasks.reducer,
    [apiTemplates.reducerPath]: apiTemplates.reducer,
  }),
  devTools: process.env.NODE_ENV !== 'production',
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(
        ...middlewares,
        apiActivities.middleware,
        apiEntities.middleware,
        apiEvents.middleware,
        apiItems.middleware,
        apiLogin.middleware,
        apiObjectives.middleware,
        apiOrganizations.middleware,
        apiPayments.middleware,
        apiProjects.middleware,
        apiTasks.middleware,
        apiTemplates.middleware,
      ),
});

// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
