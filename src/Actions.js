import React, { Component, PropTypes } from 'react';
import { UIComponent } from './decorators';

@UIComponent('actions')

export default class Actions extends Component {
  static propTypes = {
    uiStyle: PropTypes.string
  };
  render() {
    return (
      <div {...this.props}>
        {this.props.children}
      </div>
    );
  }
}
