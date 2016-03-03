import React, { Component, PropTypes } from 'react';
import { UIComponent } from '../decorators';

@UIComponent('dimmer')

export default class Dimmer extends Component {
  static propTypes = {
    uiStyle: PropTypes.string
  }
  render() {
    return (
      <div {...this.props}/>
    );
  }
}
