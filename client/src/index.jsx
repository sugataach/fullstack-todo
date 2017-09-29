import React from 'react';
import ReactDOM from 'react-dom';
import {List, Map} from 'immutable';
import {compose, createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducer';
import {TodoAppContainer} from './components/TodoApp';
import thunk from 'redux-thunk';
import configureStore from './store/configureStore';
import * as todoActions from './action_creators'

const store = configureStore();
store.dispatch(todoActions.fetchAll());

// console.log = function() { return false; }
// window.console.log = window.console.debug = window.console.info = window.console.error = function () {
//     return false;
// }

require('./main.css')

ReactDOM.render(
  <Provider store={store}>
    <TodoAppContainer />
  </Provider>,
  document.getElementById('app')
);
