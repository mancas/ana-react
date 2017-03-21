'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import WeatherApp from './components/WeatherApp';

import {Router, IndexRoute, IndexRedirect, Route, Redirect, useRouterHistory, hashHistory} from 'react-router';

const router = (
  <Router history={hashHistory}>
    <Route path='/app' component={WeatherApp} />
  </Router>
);

ReactDOM.render(router, document.getElementById('app'));
