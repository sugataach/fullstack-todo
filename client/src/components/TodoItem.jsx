import React from 'react';
import classNames from 'classNames';

export default class TodoItem extends React.Component {
  render() {
    var itemClass = classNames({
      'todo': true,
      'completed': this.props.isCompleted
    });
    return <li className={'todo' + (this.props.isCompleted ? ' checked' : '')}>
      <div className="row">
        <div className="all-cnt col-md-6">
          <input type="checkbox"
                 className="toggle"
                 checked={this.props.isCompleted}
                 onChange={() => this.props.props.toggleComplete(this.props.id)} />
          <label htmlFor="todo">
            {this.props.text}
          </label>
        </div>
        <div className="mark-all col-md-6">
          <a className="reorder"></a>
        </div>
      </div>
    </li>
  }
}
