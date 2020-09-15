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

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducer from './reducers'

// const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
// const store = createStoreWithMiddleware(reducer);
const store = createStore(reducer)

const token = localStorage.getItem('chatToken');

if (token) {
  console.log(token, 'TOKKK')
  store.dispatch({
    type: 'auth_user'
  })
}

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <PublicRoute path={chatPath || '/'} component={LoginForm} exact={true}/>
        <PrivateRoute path={`${chatPath}/home`} component={App} />
      </Switch>
    </BrowserRouter>
  </Provider>
  ,
  document.getElementById('root')
);
