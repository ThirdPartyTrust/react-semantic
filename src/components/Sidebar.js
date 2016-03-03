import React, { Component, PropTypes } from 'react';
import { UIComponent } from '../decorators';

@UIComponent('sidebar')

class Sidebar extends Component {
  static propTypes = {
    uiStyle: PropTypes.string
  }
  render() {
    return (
      <div {...this.props}/>
    );
  }
}
