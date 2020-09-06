import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter, Switch} from 'react-router-dom';
import PublicRoute from './components/route/PublicRoute'
import PrivateRoute from './components/route/PrivateRoute'
import LoginForm from './components/LoginForm'
import 'babel-polyfill'
import { chatPath } from '../config'

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <PublicRoute path={chatPath || '/'} component={LoginForm} exact={true}/>
      <PrivateRoute path={`${chatPath}/home`} component={App} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);
