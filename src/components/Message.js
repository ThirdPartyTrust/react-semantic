import React, { Component, PropTypes } from 'react';
import { UIComponent } from '../decorators';

@UIComponent('message')

export default class Message extends Component {
  static defaultProps = {
    uiStyle: PropTypes.string
  }
  render() {
    return(
      <div {...this.props}/>
    );
  }
}
