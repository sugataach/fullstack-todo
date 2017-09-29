import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';
import TodoList from './TodoList';
import TodoHeader from './TodoHeader';
import TodoTools from './TodoTools';
import {SortableContainer, arrayMove} from 'react-sortable-hoc';

const TodoListSortable = SortableContainer(TodoList);
// console.log = function() { return false;}
// window.console.log = window.console.debug = window.console.info = window.console.error = function () {
//     return false;
// }

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
  onSortEnd({oldIndex, newIndex}) {
    console.log(this.props.todos);
    console.log(oldIndex);
    const itemId = this.props.todos._tail.array[oldIndex]._root.entries[0][1];
    return this.props.reorderItem(itemId, oldIndex, newIndex);
  }
  render() {
    return <div className="todo-container">
      <header className="header">
        <h1>Todos</h1>
      </header>
      <TodoHeader addItem={this.props.addItem}/>
      <TodoListSortable onSortEnd={this.onSortEnd.bind(this)} {...this.props} />
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
