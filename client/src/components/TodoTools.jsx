import React from 'react';
import classNames from 'classnames';

export default class TodoTools extends React.Component {
  getNbItemsLeft() {
    return this.props.nbActiveItems || 0;
  }
  render() {
    return <footer className="footer">
      <span className="todo-count">
        <strong>{this.getNbItemsLeft()}</strong> items left
      </span>
      <button className="clear-completed"
              onClick={this.props.markAllAsCompleted}>
        Mark all as complete
      </button>
    </footer>
  }
};
