import React from 'react';
import ReactDOM from 'react-dom';
import {List, Map} from 'immutable';
import {compose, createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducer';
import {TodoAppContainer} from './components/TodoApp';

const createStoreDevTools = compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore);

// initialize new Redux Store
const store = createStoreDevTools(reducer);

// dispatch the SET_STATE action holding the desired state
store.dispatch({
  type: 'SET_STATE',
  state: {
    todos: [
      {id: 1, text: 'React', status: 'active'},
      {id: 2, text: 'Redux', status: 'active'},
      {id: 3, text: 'Immutable', status: 'completed'}
    ],
    filter: 'all'
  }
});

require('./main.css')

ReactDOM.render(
  // wrap Provider component to pass store down to components
  <Provider store={store}>
    <TodoAppContainer />
  </Provider>,
  document.getElementById('app')
);
