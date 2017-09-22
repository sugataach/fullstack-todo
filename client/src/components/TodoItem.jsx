import React from 'react';
import classNames from 'classNames';

export default class TodoItem extends React.Component {
  render() {
    var itemClass = classNames({
      'todo': true,
      'completed': this.props.isCompleted
    });
    return <li className={'todo' + (this.props.isCompleted ? ' checked' : '')}>
      <div className="view">
        <input type="checkbox"
               className="toggle"
               checked={this.props.isCompleted}
               onChange={() => this.props.toggleComplete(this.props.id)} />
        <label htmlFor="todo">
          {this.props.text}
        </label>
      </div>
    </li>
  }
}
