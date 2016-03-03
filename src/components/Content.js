import React, { Component, PropTypes } from 'react';
import { UIComponent } from '../decorators';

@UIComponent('content')

export default class Content extends Component {
  static propTypes = {
    uiStyle: PropTypes.string
  }
  render() {
    return (
      <div {...this.props}/>
    );
  }
}
