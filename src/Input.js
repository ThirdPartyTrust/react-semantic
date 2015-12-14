import React, { Component, PropTypes } from 'react';
import { exportComponent } from './';

class Input extends Component {
  static propTypes = {
    uiStyle: PropTypes.string,
    className: PropTypes.string,
    type: PropTypes.string,
    validate: PropTypes.any,
    validateMessage: PropTypes.string,
    required: PropTypes.bool,
    requiredMessage: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string || PropTypes.number,
    placeholder: PropTypes.string || PropTypes.number,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    disabled: PropTypes.bool,
    readOnly: PropTypes.bool
  };
  static defaultProps = {
    type: 'text',
    required: false,
    requiredMessage: 'This field is required',
    validateMessage: 'This field is invalid',
    diasbled: false,
    readOnly: false
  };
  constructor(props) {
    super(props);
    this.state = {
      message: this.props.requiredMessage,
      valid: true
    };
    this._validTypes = ['text', 'number'];
    this._changeTimeout = null;
    this._input = null;
  }
  render() {
    return (
      <div className="ui form">
        <div className={this.buildFieldClassName()}>
          {this.renderFieldLabel()}
          <div className={this.props.className}>
            <input
              type={this.props.type}
              onBlur={this.handleOnBlur.bind(this)}
              onChange={this.handleOnChange.bind(this)}
              ref={(ref) => this._input = ref}
              disabled={this.props.disabled}
              readOnly={this.props.readOnly}
            />
            {this.props.children}
          </div>
          {this.renderValidationLabel()}
        </div>
      </div>
    );
  }
  buildFieldClassName() {
    let required = this.props.required ? 'required ' : '';
    let error = this.state.valid ? ' error' : '';
    return `${required}field${error}`;
  }
  renderFieldLabel() {
    if (this.props.label) {
      return (
        <label>{this.props.label}</label>
      );
    }
  }
  renderValidationLabel() {
    if (
      !this.state.valid &&
      (this.props.validate && this.props.errorMessage || this.props.required)
    ) {
      return (
        <div className="ui red pointing prompt label transition visible">
          {this.state.message}
        </div>
      );
    }
  }
  handleOnBlur(e) {
    if (this.props.onBlur instanceof Function) {
      this.props.onBlur(e.target.value, e);
    }
    this.validateOnBlur(e);
  }
  validateOnBlur(e) {
    if (!this.props.required && this.state.valid) {
      return;
    }
    this.validate();
  }
  handleOnChange(e) {
    if (this.props.onChange instanceof Function) {
      this.props.onChange(e.target.value, e);
    }
    window.clearTimeout(this._changeTimeout);
    this._changeTimeout = window.setTimeout(
      this.validate.bind(this), 250
    );
  }
  validate() {
    let valid = true;
    if (this.props.required) {
      valid = this.validateRequired(this._input.value);
    }
    if (
      this._validTypes.indexOf(this.props.type) > -1
      && this.props.validate
      && valid
    ) {
      valid = this.validatePattern(this._input.value);
    }
    return valid;
  }
  validateRequired(value) {
    if (this._validTypes.indexOf(this.props.type) > -1 && value <= 0) {
      this.setState({
        message: this.props.requiredMessage,
        valid: false
      });
      return false;
    } else {
      this.setState({
        message: this.state.message,
        valid: true
      });
      return true;
    }
  }
  validatePattern(value) {
    if (value.search(this.props.validate) < 0) {
      this.setState({
        message: this.props.validateMessage,
        valid: false
      });
      return false;
    } else {
      this.setState({
        message: this.state.message,
        valid: true
      });
      return true;
    }
  }
}

export default exportComponent(Input, 'input');