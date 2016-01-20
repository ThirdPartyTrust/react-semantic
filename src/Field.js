import React, { Component, PropTypes } from 'react';

export default function exportField(Component, componentName) {
  class FieldComponentUI extends Component {
    static propTypes = {
      label: PropTypes.string,
      validate: PropTypes.any,
      validateMessage: PropTypes.string,
      require: PropTypes.bool,
      requireMessage: PropTypes.string
    };
    static defaultProps = {
      require: false,

    };
    render() {
      return (
        <div>
          {this.props.children}
        </div>
      );
    }
  }
  return exportUI(FieldComponentUI, componentName);
}
