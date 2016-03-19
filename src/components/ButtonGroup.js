import React, { Component, PropTypes } from 'react';
import { UIComponent } from '../decorators';

@UIComponent('buttons')

export default class ButtonGroup extends Component {
  static propTypes = {
    uiStyle: PropTypes.string,
  };
  render() {
    return (
      <div {...this.props}/>
    );
  }
}
