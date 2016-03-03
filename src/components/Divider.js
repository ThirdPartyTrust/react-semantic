import React, { Component, PropTypes } from 'react';
import { UIComponent } from '../decorators';

@UIComponent('divider')

export default class Divider extends Component {
  static propTypes = {
    uiStyle: PropTypes.string
  }
  render() {
    return (
      <div {...this.props}/>
    );
  }
}
