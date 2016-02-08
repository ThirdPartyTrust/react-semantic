import React, { Component, PropTypes } from 'react';
import { exportUI } from './';

class Label extends Component {
  render() {
    return (
      <div {...this.props}>
        {this.props.children}
      </div>
    );
  }
}

export default exportUI(Label, 'label');
