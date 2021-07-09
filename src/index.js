import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Routes from './Routes';
import Loading from './components/Loading/Loading'
import reportWebVitals from './reportWebVitals';

import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import configureStore from './config/store';
const {store, persistor} = configureStore();

Sentry.init({
  dsn: "https://ef18171f32074cdfb1e45ac0b0dcdd10@o915774.ingest.sentry.io/5856355",
  integrations: [new Integrations.BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Loading/>
      <Routes/>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
