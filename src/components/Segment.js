import React, { Component, PropTypes } from 'react';
import { UIComponent } from '../decorators';

@UIComponent('segment')

export default class Segment extends Component {
  static propTypes = {
    uiStyle: PropTypes.string
  }
  render() {
    return (
      <div {...this.props}/>
    );
  }
}
