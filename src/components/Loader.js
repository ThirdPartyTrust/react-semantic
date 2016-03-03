import React, { Component, PropTypes } from 'react';
import { UIComponent } from '../decorators';

@UIComponent('loader')

export default class Loader extends Component {
  static propTypes = {
    uiStyle: PropTypes.string
  }
  render() {
    return (
      <div {...this.props}/>
    );
  }
}
