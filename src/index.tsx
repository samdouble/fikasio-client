import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga4';
import store from 'services/store';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { envvars } from './utils/envvars';
import { initializeTranslation } from './utils/translation';
import './index.scss';

ReactGA.initialize(envvars.googleAnalyticsId);
initializeTranslation();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
