import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { Checkbox } from './';

export default class Slider extends Component {
  static propTypes = {
    uiStyle: PropTypes.string
  };
  render() {
    return (
      <Checkbox
        {...this.props}
        uiStyle={classNames(this.props.uiStyle, 'slider')}
      >
        {this.props.children}
      </Checkbox>
    );
  }
}
