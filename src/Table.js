import React, { Component, PropTypes } from 'react';
import { exportUI } from './';

class Table extends Component {
  static propTypes = {
    uiStyle: PropTypes.string
  };
  render() {
    return (
      <table {...this.props}>
        {this.props.children}
      </table>
    );
  }
}

export default exportUI(Table, 'table');
