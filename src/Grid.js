import React, { Component, PropTypes } from 'react';
import { exportComponent } from './';

class Grid extends Component {
  render() {
    return (
      <div {...this.props}>
        {this.props.children}
      </div>
    );
  }
}

export default exportComponent(Grid, 'grid');
