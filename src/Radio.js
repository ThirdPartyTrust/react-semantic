import React, { Component, PropTypes } from 'react';
import { exportComponent, Checkbox } from './';

export default class Radio extends Component {
  static propTypes = {
    uiStyle: PropTypes.string,
    className: PropTypes.string
  };
  render() {
    return (
      <Checkbox
        {...this.props}
        type="radio"
        uiStyle={this.props.uiStyle ? `${this.props.uiStyle} radio` : 'radio'}
      >
        {this.props.children}
      </Checkbox>
    );
  }
}
