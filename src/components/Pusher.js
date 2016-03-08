import React, { Component, PropTypes } from 'react';
import { UIComponent } from '../decorators';

@UIComponent('pusher')

export default class Pusher extends Component {
  static propTypes = {
    uiStyle: PropTypes.string,
    dimmed: PropTypes.bool
  }
  render() {
    return (
      <div {...this.props}/>
    );
  }
}
