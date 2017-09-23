import React from 'react';
import classNames from 'classnames';

export default class TodoTools extends React.Component {
  getNbItemsLeft() {
    return this.props.nbActiveItems || 0;
  }
  render() {
    return <footer className="footer">
        <div className="row">
            <div className="all-cnt col-md-6">
                {this.getNbItemsLeft()} {this.getNbItemsLeft() === 1 ? 'item' : 'items'} left
            </div>
            <div className="mark-all col-md-6">
                <a type="button"
                   onClick={this.props.markAllAsCompleted}
                   className="btn btn-link">
                   Mark all as complete
                </a>
            </div>
        </div>
    </footer>

  }
};
