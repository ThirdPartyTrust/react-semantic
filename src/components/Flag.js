import React, { Component, PropTypes } from 'react';
import { UIComponent } from '../decorators';

@UIComponent('flag')

export default class Flag extends Component {
  static propTypes = {
    uiStyle: PropTypes.string
  }
  render() {
    return (
      <i {...this.props}/>
    );
  }
}
