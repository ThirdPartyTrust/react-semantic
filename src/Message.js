import React, { Component, PropTypes } from 'react';
import { exportUI } from './';

class Message extends Component {
  static defaultProps = {
    uiStyle: PropTypes.string
  };
  render() {
    return(
      <div {...this.props}>
        {this.props.children}
      </div>
    );
  }
}

export default exportUI(Message, 'message');
