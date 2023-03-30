import React from 'react';
import ReactDOM from 'react-dom/client';
import {App} from './App';
// import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HashRouter } from 'react-router-dom';
import { inject } from '@vercel/analytics'
import { Provider } from 'react-redux'
import { store } from './state/store.js';
import { Auth0Provider, auth0Provider } from "@auth0/auth0-react"

const root = ReactDOM.createRoot(document.getElementById('root'));
inject()
root.render(
  <HashRouter>
    <Auth0Provider
      domain="dev-bxpbdydalm6tmklv.us.auth0.com"
      clientId="oZoxA3tZVzg4W4bFQctFITiXj9RuV0mO"
      authorizationParams={{
        redirect_uri: window.location.origin
        // redirect_uri: https://rainbowdarkness.com/
      }}
    >
      <Provider store={store}>
        <App />
      </Provider>
    </Auth0Provider>
  </HashRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
