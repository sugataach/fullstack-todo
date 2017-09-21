import React from 'react';
import TodoList from './TodoList'

export default class TodoApp extends React.Component {
  getItems() {
    return this.props.todos || [];
  }
  render() {
    return <div>
      <section className="todoApp">
        <TodoList todos={this.props.todos} />
      </section>
    </div>
  }
}
