import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { Checkbox } from './';

export default class Toggle extends Component {
  static propTypes = {
    uiStyle: PropTypes.string
  };
  render() {
    return (
      <Checkbox
        {...this.props}
        uiStyle={classNames(this.props.uiStyle, 'toggle')}
        ref={ref => this._checkbox = ref}
      >
        {this.props.children}
      </Checkbox>
    );
  }
  validate() {
    return this._checkbox.validate();
  }
  getName() {
    return this._checkbox.getName();
  }
  getValue() {
    return this._checkbox.getValue();
  }
}
