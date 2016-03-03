import React, { Component, PropTypes } from 'react';
import { UIComponent } from '../decorators';

@UIComponent('label')

export default class Label extends Component {
  static propTypes = {
    uiStyle: PropTypes.string
  }
  render() {
    return (
      <div {...this.props}/>
    );
  }
}
