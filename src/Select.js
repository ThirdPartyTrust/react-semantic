import React, { Component, PropTypes } from 'react';
import { Dropdown } from './';

export default class Select extends Component {
  static propTypes = {
    uiStyle: PropTypes.string,
    className: PropTypes.string
  }
  render() {
    return(
      <Dropdown
        {...this.props}
        uiStyle={this.props.uiStyle ? `${this.props.uiStyle} selection` : 'selection'}
        select={true}
        ref={(ref) => this._dropdown = ref}
      >
        {this.props.children}
      </Dropdown>
    )
  }
  validate() {
    return this._dropdown.validate();
  }
  getName() {
    return this._dropdown.getName();
  }
  getValue() {
    return this._dropdown.getValue();
  }
}
