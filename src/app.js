"use strict";

import React from 'react';
import ReactDom from 'react-dom';
import Routes from './routes';
import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';
import ReduxPromise from 'redux-promise';
import allReducers from './reducers/index';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middleware = [
  ReduxThunk,
  ReduxPromise
];

const store = createStore(
  allReducers,
  composeEnhancers(applyMiddleware(...middleware))
);

var container = (
  <div>
    <Provider store={store}>
      <Routes />
    </Provider>
  </div>
)

ReactDom.render(container, document.getElementById("application"))
