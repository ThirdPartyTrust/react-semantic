import React, { Component, PropTypes } from 'react';
import { UIComponent } from '../decorators';

@UIComponent('menu')

export default class Menu extends Component {
  static propTypes: {
    uiStyle: PropTypes.string   
  }
  render() {
    return (
      <div {...this.props}/>
    );
  }
}
