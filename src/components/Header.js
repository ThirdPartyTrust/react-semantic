import React, { Component, PropTypes } from 'react';
import { UIComponent } from '../decorators';

@UIComponent('header')

export default class Header extends Component {
  static propTypes = {
    uiElement: PropTypes.string
  }
  static defaultProps = {
    uiElement: 'div'
  }
  elementMap = {
    h1: () =>
      <h1 {...this.props}/>,
    h2: () =>
      <h2 {...this.props}/>, 
    h3: () =>
      <h3 {...this.props}/>,
    h4: () =>
      <h4 {...this.props}/>,
    h5: () =>
      <h5 {...this.props}/>,
    div: () =>
      <div {...this.props}/>
  }
  render() {
    const { uiElement } = this.props;
    let el = Object.keys(this.elementMap).indexOf(uiElement) > -1
      ? uiElement : 'div';
    return this.elementMap[el]();
  }
}
