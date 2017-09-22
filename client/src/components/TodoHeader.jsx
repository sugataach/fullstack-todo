import React from 'react';

export default class TodoHeader extends React.Component {
  _handleKeyPress(e) {
    if (e.key === 'Enter' && this.refs.addTodoInput.value != '') {
      var temp = this.refs.addTodoInput.value;
      this.refs.addTodoInput.value = '';
      return this.props.addItem(temp);
    }
  }
  render() {
    return <header className="header">
      <h1>todos</h1>
      <input className="new-todo"
             ref="addTodoInput"
             autofocus
             autoComplete="off"
             placeholder="What needs to be done?"
             onKeyPress = {this._handleKeyPress.bind(this)} />
    </header>
  }
};
