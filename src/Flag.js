import React, { Component, PropTypes } from 'react';
import exportComponent from './UIComponent';

class Flag extends Component {
  static propTypes = {
    uiStyle: PropTypes.string,
    className: PropTypes.string
  };
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <i className={this.props.className}/>
    );
  }
}

export default exportComponent(Flag, 'flag');