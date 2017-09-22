import React from 'react';

export default class TodoHeader extends React.Component {
  _handleClick(e) {
    if (this.refs.addTodoInput.value != '') {
      const itemText = this.refs.addTodoInput.value;
      this.refs.addTodoInput.value = '';
      return this.props.addItem(itemText);
    }
  }
  render() {
    return <div className="input-form">
      <form className="form-inline">
        <div className="row">
          <button type="button"
                  onClick={this._handleClick.bind(this)}
                  className="btn btn-submit">
                  Add Todo
          </button>
          <div className="col-md-8 todoinput-group">
            <div className="form-group">
              <input type="text"
                     className="form-control"
                     ref="addTodoInput"
                     placeholder="What needs to be done?"/>
            </div>
          </div>
          <div className="col-md-4 addbtn-group">
          </div>
        </div>
      </form>
    </div>
  }
};
