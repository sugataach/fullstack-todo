import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classNames from 'classNames';
import TextInput from './TextInput';

export default class TodoItem extends React.Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }
  render() {
    var itemClass = classNames({
      'todo': true,
      'completed': this.props.isCompleted
    });
    return <li className={itemClass}>
      <div className="view">
        <input type="checkbox"
          className="toggle"
          defaultChecked={this.props.isCompleted}
          onClick={() => this.props.toggleComplete(this.props.id)}/>
        <label htmlFor="todo">
          {this.props.text}
        </label>
      </div>
      <button className="destroy"></button>
    </li>
  }
}
