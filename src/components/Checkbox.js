import React, { Component, PropTypes } from 'react';
import { UIComponent } from '../decorators';
import classNames from 'classnames';

@UIComponent('checkbox')

export default class Checkbox extends Component {
  static propTypes = {
    uiStyle: PropTypes.string,
    className: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    require: PropTypes.bool,
    requireMessage: PropTypes.string,
    label: PropTypes.node,
    value: PropTypes.string || PropTypes.number,
    onClick: PropTypes.func,
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
    readOnly: PropTypes.bool,
    checked: PropTypes.bool
  }
  static defaultProps = {
    type: 'checkbox',
    disabled: false,
    readOnly: false,
    require: false,
    requireMessage: 'This field is required',
    checked: false,
    label: ''
  }
  state = {
    valid: true,
    checked: this.props.checked
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.checked != this.state.checked) {
      this.setState({
        valid: this.state.valid,
        checked: nextProps.checked
      });
    }
  }
  render() {
    return (
      <div
        style={this.props.style}
        className={this.buildFieldClassName()}
      >
        <div
          className={this.buildInputClassName()}
          onClick={this.handleOnClick.bind(this)}
        >
          <input
            className="hidden"
            type={this.props.type}
            name={this.props.name}
            disabled={this.props.disabled || this.props.readOnly}
            checked={this.state.checked}
            value={this.props.value}
            ref={(ref) => this._checkbox = ref}
          />
          {this.renderFieldLabel()}
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
  buildInputClassName() {
    return classNames(this.props.className, {
      checked: this.state.checked
    });
  }
  renderFieldLabel() {
    return (
      <label>{this.props.label}</label>
    );
  }
  renderValidationLabel() {
    if (!this.state.valid) {
      return (
        <div className="ui red pointing prompt label transition visible">
          {this.props.requireMessage}
        </div>
      );
    }
  }
  handleOnClick(e) {
    if (this.props.disabled || this.props.readOnly) {
      return;
    }
    if (this.props.onClick instanceof Function) {
      let continueDefault = this.props.onClick(this, e);
      if (continueDefault === false) {
        return;
      }
    }
    this.setState({
      valid: this.state.valid,
      checked: !this.state.checked
    }, function(){
      this.validate();
      if (this.props.onChange instanceof Function) {
        this.props.onChange(this, e);
      }
    }.bind(this, e));
  }
  validate() {
    let valid = !(this.props.require && !this.state.checked);
    if (valid !== this.state.valid) {
      this.setState({
        valid: valid,
        checked: this.state.checked
      });
    }
    return valid;
  }
  getName() {
    return this.props.name;
  }
  getValue() {
    return this.state.checked;
  }
}
