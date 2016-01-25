import React, { Component, PropTypes } from 'react';
import { exportComponent } from './';

class Header extends Component {
  static propTypes = {
    uiElement: PropTypes.string
  };
  static defaultProps = {
    uiElement: 'div'
  };
  elementMap = {
    h1: () =>
      <h1 {...this.props}>{this.props.children}</h1>,
    h2: () =>
      <h2 {...this.props}>{this.props.children}</h2>, 
    h3: () =>
      <h3 {...this.props}>{this.props.children}</h3>,
    h4: () =>
      <h4 {...this.props}>{this.props.children}</h4>,
    h5: () =>
      <h5 {...this.props}>{this.props.children}</h5>,
    div: () =>
      <div {...this.props}>{this.props.children}</div>
  };
  render() {
    const { uiElement } = this.props;
    let el = Object.keys(this.elementMap).indexOf(uiElement) > -1
      ? uiElement : 'div';
    return this.elementMap[el]();
  }
}

export default exportComponent(Header, 'header');
