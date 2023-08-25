import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import ReactGA from 'react-ga4';
import store from 'services/store';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { initializeTranslation } from './utils/translation';
import './index.scss';

ReactGA.initialize('G-SVDHZ0XXWX');
initializeTranslation();

const domNode = document.getElementById('root');
const root = createRoot(domNode!);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
