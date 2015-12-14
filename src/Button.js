import React, { Component, PropTypes } from 'react';
import { exportComponent } from './';

class Button extends Component {
  static propTypes = {
    uiStyle: PropTypes.string,
    className: PropTypes.string,
    type: PropTypes.string,
    disabled: PropTypes.bool
  };
  static defaultProps = {
    type: 'button',
    disabled: false
  };
  render() {
    return (
      <button
        className={this.props.className}
        type={this.props.type}
        disabled={this.props.disabled}
      >
        {this.props.children}
      </button>
    );
  }
}

export default exportComponent(Button, 'button');
