import React, { Component, PropTypes } from 'react';
import { exportUI } from './';

class Icon extends Component {
  render() {
    return (
      <i {...this.props}/>
    );
  }
}

export default exportUI(Icon, 'icon');
