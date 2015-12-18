import React, { Component, PropTypes } from 'react';
import { exportComponent } from './';

class Input extends Component {
  static propTypes = {
    uiStyle: PropTypes.string,
    className: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    validate: PropTypes.any,
    validateMessage: PropTypes.string,
    require: PropTypes.bool,
    requireMessage: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string || PropTypes.number,
    placeholder: PropTypes.string || PropTypes.number,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    disabled: PropTypes.bool,
    readOnly: PropTypes.bool,
    maxLength: PropTypes.string || PropTypes.number,
    rows: PropTypes.string || PropTypes.number,
    cols: PropTypes.string || PropTypes.number
  };
  static defaultProps = {
    type: 'text',
    require: false,
    requireMessage: 'This field is required',
    validateMessage: 'This field is invalid',
    diasbled: false,
    readOnly: false
  };
  constructor(props) {
    super(props);
    this.state = {
      message: this.props.requireMessage,
      valid: true
    };
    this._validTypes = ['text', 'number', 'textarea', 'password'];
    this._changeTimeout = null;
    this._input = null;
  }
  render() {
    return (
      <div className="ui form">
        <div className={this.buildFieldClassName()}>
          {this.renderFieldLabel()}
          <div className={this.props.className}>
            {this.renderInputByType()}
            {this.props.children}
          </div>
          {this.renderValidationLabel()}
        </div>
      </div>
    );
  }
  buildFieldClassName() {
    let require = this.props.require ? 'required' : '';
    let error = !this.state.valid ? 'error' : '';
    return `${require} field ${error}`;
  }
  renderFieldLabel() {
    if (this.props.label) {
      return (
        <label>{this.props.label}</label>
      );
    }
  }
  renderInputByType() {
    if (this.props.type === 'textarea') {
      return (
        <textarea
          {...this.props}
          children={null}
          onBlur={this.handleOnBlur.bind(this)}
          onChange={this.handleOnChange.bind(this)}
          ref={(ref) => this._input = ref}
        />
      );
    } else {
      return (
        <input
          {...this.props}
          children={null}
          onBlur={this.handleOnBlur.bind(this)}
          onChange={this.handleOnChange.bind(this)}
          ref={(ref) => this._input = ref}
        />
      )
    }
  }
  renderValidationLabel() {
    if (
      !this.state.valid &&
      (this.props.validate && this.props.errorMessage || this.props.require)
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
      this.props.onBlur(this, e);
    }
    this.validateOnBlur(e);
  }
  validateOnBlur(e) {
    if (!this.props.require && this.state.valid) {
      return;
    }
    this.validate();
  }
  handleOnChange(e) {
    window.clearTimeout(this._changeTimeout);
    this._changeTimeout = window.setTimeout(
      this.onChange.bind(this, e), 250
    );
  }
  onChange(e) {
    if (this.props.onChange instanceof Function) {
      this.props.onChange(this, e);
    }
    this.validate();
  }
  validate() {
    let valid = true;
    if (this.props.require) {
      valid = this.validaterequire(this._input.value);
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
  validaterequire(value) {
    if (this._validTypes.indexOf(this.props.type) > -1 && value <= 0) {
      this.setState({
        message: this.props.requireMessage,
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
  getName() {
    return this.props.name;
  }
  getValue() {
    if (!this._input) {
      return null;
    }
    return this._input.value;
  }
}

export default exportComponent(Input, 'input');