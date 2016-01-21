import React, { Component, PropTypes } from 'react';
import exportComponent from './UIComponent';

class Label extends Component {
  render() {
    return (
      <div {...this.props}>
        {this.props.children}
      </div>
    );
  }
}

export default exportComponent(Label, 'label');
