import React, { Component, PropTypes } from 'react';
import exportComponent from './UIComponent';

class Icon extends Component {
  render() {
    return (
      <i {...this.props}/>
    );
  }
}

export default exportComponent(Icon, 'icon');
