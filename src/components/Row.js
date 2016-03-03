import React, { Component, PropTypes } from 'react';
import { UIComponent } from '../decorators';

@UIComponent('row')

export default class Row extends Component {
  static propTypes = {
    uiStyle: PropTypes.string
  }
  render() {
    return (
      <div {...this.props}/>
    );
  }
}
