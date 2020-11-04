import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux';
import {Provider} from 'react-redux';

const initialReduxState = {
  loggedIn: false,
  showingSideNav: false
};

const reducer = (state=initialReduxState, action) => {
  if (action.type ==='LOGIN'){
    return{
      ...state,
      loggedIn: true
    }
  }

  if (action.type ==='LOGOUT'){
    return{
      ...state,
      loggedIn: false
    }
  }
  if (action.type ==='OPENSIDENAV'){
    return{
      ...state,
      showingSideNav: true
    }
  }
  if (action.type ==='CLOSESIDENAV'){
    return{
      ...state,
      showingSideNav: false
    }
  }


  return state
}

const store = createStore(reducer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}><App /></Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
