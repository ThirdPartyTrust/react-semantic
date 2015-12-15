import React, { Component, PropTypes } from 'react';
import { exportComponent, Checkbox } from './';

export default class Slider extends Component {
  static propTypes = {
    uiStyle: PropTypes.string,
    className: PropTypes.string
  };
  render() {
    return (
      <Checkbox
        {...this.props}
        uiStyle={this.props.uiStyle ? `${this.props.uiStyle} slider` : 'slider'}
      >
        {this.props.children}
      </Checkbox>
    );
  }
}
