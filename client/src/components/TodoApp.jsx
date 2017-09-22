import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';
import TodoList from './TodoList';
import TodoHeader from './TodoHeader';
import TodoTools from './TodoTools';

export class TodoApp extends React.Component {
  getNbActiveItems() {
    if (this.props.todos) {
      const activeItems = this.props.todos.filter(
        (item) => item.get('status') === 'active'
      );
      return activeItems.size;
    }
    return 0;
  }
  render() {
    return <div className="todo-container">
      <header className="header">
        <h1>Todos</h1>
      </header>
      <TodoHeader addItem={this.props.addItem}/>
      <TodoList {...this.props} />
      <TodoTools filter={this.props.filter}
                 nbActiveItems={this.getNbActiveItems()}
                 markAllAsCompleted={this.props.markAllAsCompleted} />
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
