import React, { Component, PropTypes } from 'react';
import { UIComponent } from '../decorators';

@UIComponent('icon')

export default class Icon extends Component {
  static propTypes = {
    uiStyle: PropTypes.string
  }
  render() {
    return (
      <i {...this.props}/>
    );
  }
}
