import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';
import TodoItem from './TodoItem';
import TodoHeader from './TodoHeader';
import TodoTools from './TodoTools';
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';

const SortableItem = SortableElement(TodoItem);

const SortableList = SortableContainer(({items, props}) => {
  return (
    <section className="body">
      <ul className="todos">
        {items.map((value, index) =>
          <SortableItem key={index}
                        index={index}
                        value={value}
                        props={props}
                        text={value.get('text')}
                        id={value.get('id')}
                        isCompleted={props.isCompleted(value)}
                        {...props}/>
        )}
      </ul>
    </section>
  );
});

export class TodoApp extends React.Component {
  getActiveItems() {
    if (this.props.todos) {
      const activeItems = this.props.todos.filter(
        (item) => item.get('status') === 'active'
      );
      return activeItems.size;
    }
    return 0;
  }
  onSortEnd({oldIndex, newIndex}) {
    const itemId = this.props.todos.get(oldIndex).get('id');
    return this.props.reorderItem(itemId, oldIndex, newIndex);
  }
  getItems() {
    if (this.props.todos) {
      return this.props.todos.filter(
        (item) => this.props.filter === 'all' || item.get('status') === this.props.filter
      );
    }
    return [];
  }
  isCompleted(value) {
    return value.get('status') === 'completed';
  }
  render() {
    return <div className="todo-container">
      <header className="header">
        <h1>Todos</h1>
      </header>
      <TodoHeader addItem={this.props.addItem}/>
      <SortableList
        items={this.getItems()}
        props={this}
        onSortEnd={this.onSortEnd.bind(this)}
      />
      <TodoTools filter={this.props.filter}
                 activeItems={this.getActiveItems()}
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
