import React, { Component, PropTypes } from 'react';

class Field extends Component {
  static propTypes = {

  };
  static defaultProps = {

  };
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

export default exportComponent(Field, 'field');
