import React, { Component, PropTypes } from 'react';
import { exportComponent, Checkbox } from './';
import classNames from 'classnames';

export default class Toggle extends Component {
  static propTypes = {
    uiStyle: PropTypes.string,
    className: PropTypes.string
  };
  render() {
    return (
      <Checkbox
        {...this.props}
        uiStyle={this.buildStyle()}
      >
        {this.props.children}
      </Checkbox>
    );
  }
  buildStyle() {
    return classNames(this.props.uiStyle, 'toggle');
  }
}
