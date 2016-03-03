import React, { Component, PropTypes } from 'react';
import { UIComponent } from './decorators';

@UIComponent('button')

export default class Button extends Component {
  static propTypes = {
    uiStyle: PropTypes.string,
    type: PropTypes.string,
    disabled: PropTypes.bool
  };
  static defaultProps = {
    type: 'button',
    disabled: false
  };
  render() {
    return (
      <button {...this.props}>
        {this.props.children}
      </button>
    );
  }
}
