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
      >
        {this.props.children}
      </Checkbox>
    );
  }
}
