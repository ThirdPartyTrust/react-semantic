import React, { Component, PropTypes } from 'react';
import exportComponent from './UIComponent';

export default class Label extends Component {
  static propTypes = {
    uiStyle: PropTypes.string,
  };
  static defaultProps = {
    uiStyle: null,
  };
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className={this.props.className}>
        {this.props.children}
      </div>
    );
  }
}

export default exportComponent(Label, 'label');