import React, { Component, PropTypes } from 'react';
import { exportUI } from './';

class Content extends Component {
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

export default exportUI(Content, 'content');
