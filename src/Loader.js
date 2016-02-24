import React, { Component, PropTypes } from 'react';
import { exportUI } from './';

class Loader extends Component {
  static propTypes = {
    uiStyle: PropTypes.string
  };
  render() {
    return (
      <div {...this.props}>
        {this.props.children}
      </div>
    );
  }
}

export default exportUI(Loader, 'loader');
