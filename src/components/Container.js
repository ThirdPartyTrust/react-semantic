import React, { Component, PropTypes } from 'react';
import { UIComponent } from '../decorators';

@UIComponent('container')

export default class Container extends Component {
  static propTypes = {
    uiStyle: PropTypes.string
  }
  render() {
    return (
      <div {...this.props}/>
    );
  }
}
