import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { Label } from '../';
import { UIComponent } from '../decorators';

@UIComponent('input')

export default class Input extends Component {
  static propTypes = {
    uiStyle: PropTypes.string,
    className: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    validate: PropTypes.any,
    validateMessage: PropTypes.string,
    validateOnChange: PropTypes.bool,
    require: PropTypes.bool,
    requireMessage: PropTypes.string,
    requireOnChange: PropTypes.bool,
    label: PropTypes.any,
    value: PropTypes.any,
    placeholder: PropTypes.any,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    disabled: PropTypes.bool,
    readOnly: PropTypes.bool,
    maxLength: PropTypes.number,
    rows: PropTypes.number,
    cols: PropTypes.number,
    defaultValue: PropTypes.any,
    valid: PropTypes.bool
  }
  static defaultProps = {
    type: 'text',
    require: false,
    requireMessage: 'This field is required',
    validateMessage: 'This field is invalid',
    requireOnChange: true,
    validateOnChange: true,
    disabled: false,
    readOnly: false
  }
  state = {
    value: this.props.value || this.props.defaultValue,
    message: this.props.requireMessage,
    valid: true
  }
  constructor(props) {
    super(props);
    this._validTypes = ['text', 'number', 'textarea', 'password'];
    this._changeTimeout = null;
    this._input = null;
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.value && nextProps.value !== this.state.value) {
      this.setState(Object.assign({}, this.state, {
        value: nextProps.value
      }));
    }
  }
  render() {
    return (
      <div className={this.buildFieldClassName()}>
        {this.renderFieldLabel()}
        <div className={this.props.className}>
          {this.renderInputByType()}
          {this.props.children}
        </div>
        {this.renderValidationLabel()}
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
  renderInputByType() {
    if (this.props.type === 'textarea') {
      return (
        <textarea
          {...this.props}
          value={this.state.value}
          children={null}
          onFocus={this.handleOnFocus.bind(this)}
          onBlur={this.handleOnBlur.bind(this)}
          onChange={this.handleOnChange.bind(this)}
          ref={(ref) => this._input = ref}
        />
      );
    } else {
      return (
        <input
          {...this.props}
          value={this.state.value}
          children={null}
          onFocus={this.handleOnFocus.bind(this)}
          onBlur={this.handleOnBlur.bind(this)}
          onChange={this.handleOnChange.bind(this)}
          ref={(ref) => this._input = ref}
        />
      )
    }
  }
  renderValidationLabel() {
    if (this.props.validate || this.props.require) {
      return (
        <Label
          uiStyle="red pointing prompt"
          transition="scale"
          visible={!this.state.valid}
        >
          {this.state.message}
        </Label>
      );
    }
  }
  handleOnBlur(e) {
    if (this.props.onBlur instanceof Function) {
      this.props.onBlur(this, e);
    }
    this.validateOnBlur();
  }
  validateOnBlur() {
    if (!this.props.require && this.state.valid) {
      return;
    }
    this.validate();
  }
  handleOnFocus() {
    if (this.props.validateOnChange) {
      return;
    }
    this.setState({
      ...this.state,
      valid: true
    });
  }
  handleOnChange(e) {
    this.setState(Object.assign({}, this.state, {
      value: e.target.value
    }), () => {
      if (this.props.onChange instanceof Function) {
        this.props.onChange(this, e);
      }
      if (!this.props.validateOnChange && this.state.valid) {
        return;
      }
      window.clearTimeout(this._changeTimeout);
      this._changeTimeout = window.setTimeout(
        this.validate(), 300
      );
    });
  }
  validate() {
    let valid = true;
    if (this.props.require) {
      valid = this.validateRequire(this.state.value);
    }
    if (
      this._validTypes.indexOf(this.props.type) > -1
      && this.props.validate
      && valid
    ) {
      if (this.props.validate instanceof RegExp) {
        valid = this.validatePattern(this.state.value);
      } else if (this.props.validate instanceof Function) {
        valid = this.validateFunction(this.state.value);
      }
    }
    return valid;
  }
  validateRequire(value) {
    if (!value || this._validTypes.indexOf(this.props.type) > -1 && value <= 0) {
      this.setState({
        value: this.state.value,
        message: this.props.requireMessage,
        valid: false
      });
      return false;
    } else {
      this.setState({
        value: this.state.value,
        message: this.state.message,
        valid: true
      });
      return true;
    }
  }
  validatePattern(value) {
    if (!value) {
      return true;
    }
    if (value.search(this.props.validate) < 0) {
      this.setState({
        value: this.state.value,
        message: this.props.validateMessage,
        valid: false
      });
      return false;
    } else {
      this.setState({
        value: this.state.value,
        message: this.state.message,
        valid: true
      });
      return true;
    }
  }
  validateFunction(value) {
    if (!value) {
      return true;
    }
    let isValid = this.props.validate(value);
    if (typeof isValid !== 'boolean') {
      return true;
    }
    this.setState({
      value: this.state.value,
      message: !isValid ? this.props.validateMessage : this.state.message,
      valid: isValid
    });
    return isValid;
  } 
  getName() {
    return this.props.name;
  }
  getValue() {
    if (!this._input) {
      return null;
    }
    return this.state.value;
  }
}
