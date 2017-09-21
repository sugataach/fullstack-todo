import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import TextInput from './TextInput';

export default class TodoItem extends React.Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }
  render() {
    return <li className="todo">
      <div className="view">
        <input type="checkbox" className="toggle" />
        <label htmlFor="todo">
          {this.props.text}
        </label>
      </div>
      <button className="destroy"></button>
    </li>
  }
}
