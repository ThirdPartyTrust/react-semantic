import React, { Component, PropTypes } from 'react';
import { exportUI } from './';

class Row extends Component {
  static propTypes = {
    className: PropTypes.string,
    uiStyle: PropTypes.string
  };
  render() {
    return (
      <div className={this.props.className}>
        {this.props.children}
      </div>
    );
  }
}

export default exportUI(Row, 'row');