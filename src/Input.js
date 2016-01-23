import React, { Component, PropTypes } from 'react';
import { exportComponent, Label } from './';
import classNames from 'classnames';

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
    cols: PropTypes.string || PropTypes.number,
    defaultValue: PropTypes.string || PropTypes.number
  };
  static defaultProps = {
    type: 'text',
    require: false,
    requireMessage: 'This field is required',
    validateMessage: 'This field is invalid',
    diasbled: false,
    readOnly: false,
    value: ''
  };
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value,
      message: this.props.requireMessage,
      valid: true
    };
    this._validTypes = ['text', 'number', 'textarea', 'password'];
    this._changeTimeout = null;
    this._input = null;
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.state.value) {
      this.setState(Object.assign({}, this.state, {
        value: nextProps.value
      }));
    }
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
  handleOnChange(e) {
    if (this.props.onChange instanceof Function) {
      this.props.onChange(this, e);
    }
    this.setState(Object.assign({}, this.state, {
      value: e.target.value
    }), () => {
      window.clearTimeout(this._changeTimeout);
      this._changeTimeout = window.setTimeout(
        this.validate(), 300
      );
    }.bind(this));
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
      valid = this.validatePattern(this.state.value);
    }
    return valid;
  }
  validateRequire(value) {
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

export default exportComponent(Input, 'input');
