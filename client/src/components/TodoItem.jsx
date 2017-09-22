import React from 'react';
import classNames from 'classNames';

export default class TodoItem extends React.Component {
  render() {
    var itemClass = classNames({
      'todo': true,
      'completed': this.props.isCompleted
    });
    return <li className={itemClass}>
      <div className="view">
        <input type="checkbox"
               className="toggle"
               checked={this.props.isCompleted}
               onClick={() => this.props.toggleComplete(this.props.id)} />
        <label htmlFor="todo">
          {this.props.text}
        </label>
        <button className="destroy"></button>
      </div>
    </li>
  }
}
