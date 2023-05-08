import React from 'react';
import ReactDOM from 'react-dom/client';
import {App} from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HashRouter } from 'react-router-dom';
import { inject } from '@vercel/analytics'
import { Provider } from 'react-redux'
import { store } from './state/store.js';
import { Auth0Provider } from "@auth0/auth0-react"

const root = ReactDOM.createRoot(document.getElementById('root'));
inject()
root.render(
  <HashRouter>
    <Auth0Provider
      domain= "dev-bxpbdydalm6tmklv.us.auth0.com"
      clientId= "oZoxA3tZVzg4W4bFQctFITiXj9RuV0mO"
      // audience= "https://www.rainbowdarkness-api.com"
      authorizationParams={{
        // redirect_uri: 'https://rainbowdarkness.com/'
        // redirect_uri: 'http://localhost:3000'
        redirect_uri: window.location.origin
      }}
    >
      <Provider store={store}>
        <App />
      </Provider>
    </Auth0Provider>
  </HashRouter>
);