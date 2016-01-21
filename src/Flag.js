import React, { Component, PropTypes } from 'react';
import exportComponent from './UIComponent';

class Flag extends Component {
  render() {
    return (
      <i {...this.props}/>
    );
  }
}

export default exportComponent(Flag, 'flag');
