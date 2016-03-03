import React, { Component, PropTypes } from 'react';
import { Header } from '../';
import { UIComponent } from '../decorators';

@UIComponent('popup')

export default class Popup extends Component {
  static propTypes = {
    transition: PropTypes.string,
    visible: PropTypes.bool
  }
  static defaultProps = {
    transition: 'scale',
    visible: false
  }
  render() {
    return (
      <div {...this.props}/>
    );
  };
};
