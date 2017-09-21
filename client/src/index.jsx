import React from 'react';
import ReactDOM from 'react-dom';
import {List, Map} from 'immutable';

import TodoApp from './components/TodoApp';

const todos = List.of(
  Map({id: 1, text: 'React', status: 'active'}),
  Map({id: 2, text: 'Redux', status: 'active'}),
  Map({id: 3, text: 'Immutable', status: 'completed'})
);

require('../node_modules/todomvc-app-css/index.css')

ReactDOM.render(
  <TodoApp todos={todos} />,
  document.getElementById('app')
);
