import React from 'react';
import TodoList from './TodoList'

export default class TodoApp extends React.Component {
  render() {
    return <div>
      <section className="todoApp">
        <TodoList todos={this.props.todos} filter={this.props.filter}/>
      </section>
    </div>
  }
}
