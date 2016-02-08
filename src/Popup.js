import React, { Component, PropTypes } from 'react';
import { Header, exportUI } from './';
import classNames from 'classnames';

class Popup extends Component {
  static propTypes = {
    transition: PropTypes.string,
    visible: PropTypes.bool
  };
  static defaultProps = {
    transition: 'scale',
    visible: false
  };
  render() {
    return (
      <div {...this.props}>
        {this.props.children}
      </div>
    );
  };
};

export default exportUI(Popup, 'popup');
