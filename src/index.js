import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { App } from './App'
import { store } from './store'
import { PersistGate } from "redux-persist/integration/react";
import { persistedStore } from "./store";

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
          <PersistGate persistor={persistedStore}>
              <BrowserRouter>
                  <App/>
              </BrowserRouter>
          </PersistGate>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);