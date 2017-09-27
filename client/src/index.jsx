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
store.dispatch(todoActions.fetchTodos());

require('./main.css')

ReactDOM.render(
  // wrap Provider component to pass store down to components
  <Provider store={store}>
    <TodoAppContainer />
  </Provider>,
  document.getElementById('app')
);
