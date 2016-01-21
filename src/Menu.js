import React, { Component, PropTypes } from 'react';
import { exportComponent } from './';

class Menu extends Component {
  render() {
    return (
      <div {...this.props}>
        {this.props.children}
      </div>
    );
  }
}

export default exportComponent(Menu, 'menu');
