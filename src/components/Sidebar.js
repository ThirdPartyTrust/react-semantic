import React, { Component, PropTypes } from 'react';
import { UIComponent } from '../decorators';

@UIComponent('sidebar')

export default class Sidebar extends Component {
  static propTypes = {
    uiStyle: PropTypes.string,
    direction: PropTypes.string,
    onOutsideClick: PropTypes.func
  }
  static defaultProps = {
    direction: 'left',
    onOutsideClick: () => {}
  }
  render() {
    return (
      <div {...this.props}/>
    );
  }
}
