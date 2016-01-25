import React, { Component, PropTypes } from 'react';
import { exportComponent } from './';

class Actions extends Component {
  render() {
    return (
      <div {...this.props}>
        {this.props.children}
      </div>
    );
  }
}

export default exportComponent(Actions, 'actions');
