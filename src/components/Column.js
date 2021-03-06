import React, { Component, PropTypes } from 'react';
import { UIComponent } from '../decorators';

@UIComponent('column')

export default class Column extends Component {
  static propTypes = {
    uiStyle: PropTypes.string
  }
  render() {
    return (
      <div {...this.props}/>
    );
  }
}
