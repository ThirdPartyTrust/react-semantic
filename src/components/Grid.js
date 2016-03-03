import React, { Component, PropTypes } from 'react';
import { UIComponent } from '../decorators';

@UIComponent('grid')

export default class Grid extends Component {
  static propTypes = {
    uiStyle: PropTypes.string
  }
  render() {
    return (
      <div {...this.props}/>
    );
  }
}
