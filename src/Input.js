import React, { Component, PropTypes } from 'react';
import exportComponent from './UIComponent';

export default class Input extends Component {
  static propTypes = {
    uiStyle: PropTypes.string,
    className: PropTypes.string
  };
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className={this.props.className}>
        {this.props.children}
      </div>
    );
  }
}

export default exportComponent(Input, 'input');