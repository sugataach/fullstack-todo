import React from 'react';
import TodoList from './TodoList';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';

export class TodoApp extends React.Component {
  render() {
    return <div>
      <section className="todoApp">
        <TodoList {...this.props} />
      </section>
    </div>
  }
}
function mapStateToProps(state) {
  return {
    todos: state.get('todos'),
    filter: state.get('filter')
  };
}

export const TodoAppContainer = connect(mapStateToProps, actionCreators)(TodoApp);
