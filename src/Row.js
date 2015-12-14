import React, { Component, PropTypes } from 'react';
import { exportComponent } from './';

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

export default exportComponent(Row, 'row');