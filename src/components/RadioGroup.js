import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { Radio } from '../';

export default class RadioGroup extends Component {
  static propTypes = {
    uiStyle: PropTypes.string,
    className: PropTypes.string,
    require: PropTypes.bool,
    requireMessage: PropTypes.string,
    label: PropTypes.string
  };
  static defaultProps = {
    require: false,
    requireMessage: 'This field is required'
  };
  render() {
    return (
      <div className="ui form">
        <div className={this.buildFieldClassName()}>
          {this.renderFieldLabel()}
          <div>
            {this.props.children}
          </div>
          {this.renderValidationLabel()}
        </div>
      </div>
    );
  }
  buildFieldClassName() {
    return classNames({
      required: this.props.require,
      field: true,
      error: !this.state.valid
    });
  }
  renderFieldLabel() {
    if (this.props.label) {
      return (
        <label>{this.props.label}</label>
      );
    }
  }
}
