import React, { Component, PropTypes } from 'react';
import { exportComponent } from './';

class Message extends Component {
  static defaultProps = {
    uiStyle: PropTypes.string,
    className: PropTypes.string
  };
  render() {
    return(
      <div className={this.className}>
        {this.props.children}
      </div>
    );
  }
}

export default exportComponent(Message, 'message');
