import React, { Component, PropTypes } from 'react';
import { exportComponent } from './';

class Dropdown extends Component {
  static propTypes = {
    uiStyle: PropTypes.string,
    className: PropTypes.string,
    require: PropTypes.bool,
    name: PropTypes.string,
    requireMessage: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    defaultValue: PropTypes.string,
    disabled: PropTypes.bool,
    placeholder: PropTypes.string,
    select: PropTypes.bool
  };
  static defaultProps = {
    require: false,
    requireMessage: 'This field is required',
    disabled: false,
    select: false
  };
  constructor(props) {
    super(props);
    this.state = {
      message: this.props.requireMessage,
      valid: true,
      value: this.props.defaultValue,
      valueContent: this.renderDefaultValue(this.props.defaultValue),
      open: false
    }
    this._dropdown = null;
  }
  componentWillMount() {
    window.addEventListener('click', this.handleOutsideClick.bind(this), true);
  }
  componentWillUnmount() {
    window.removeEventListener('click', this.handleOutsideClick.bind(this), true);
  }
  render() {
    return (
      <div className="ui form">
        <div className={this.buildFieldClassName()}>
          {this.renderFieldLabel()}
          <div
            className={`${this.props.className}${this.state.open ? ' active visible' : ''}`}
            onClick={this.handleClick.bind(this)}
            ref={(ref) => this._dropdown = ref}
          >
            <i className="dropdown icon" onClick={this.state.open ? this.closeMenu.bind(this) : null}></i>
            <div className={this.props.select && !this.state.valueContent ? 'default text' : 'text'}>
              {this.state.valueContent ? this.state.valueContent : this.props.placeholder}
            </div>
            <div
              className={this.state.open ? 'menu active visible' : 'menu'}
              style={this.state.open ? {display: 'block'} : {}}
            >
              {this.renderChildren()}
            </div>
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
  renderValidationLabel() {
    if (!this.state.valid && this.props.require) {
      return (
        <div className="ui red pointing prompt label transition visible">
          {this.state.message}
        </div>
      );
    }
  }
  renderChildren() {
    if (Array.isArray(this.props.children)) {
      return this.props.children.map(child => {
        return this.renderChild(child);
      }.bind(this));
    }
    return this.renderChild(this.props.children);
  }
  renderChild(child, bindChange = true, value) {
    let val = value ? value : this.state.value;
    return (
      <div
        className={val === child.props.value ? 'item active selected' : 'item'}
        onClick={bindChange ? this.handleChange.bind(this, child) : this.closeMenu.bind(this)}
        key={`dropdown_option_${child.props.value}`}
      >
        {child.props.children}
      </div>
    );
  }
  renderDefaultValue() {
    var valueComponent = null;
    if (!this.props.children) {
      return valueComponent;
    }
    if (Array.isArray(this.props.children)) {
      this.props.children.map(child => {
        if (child.props.value === this.props.defaultValue) {
          valueComponent = this.renderChild(child, false, this.props.defaultValue)
        }
      }.bind(this))
    } else {
      if (this.props.children.props.value === this.props.defaultValue) {
        valueComponent = this.renderChild(child, false, this.props.defaultValue)
      }
    }
    return valueComponent;
  }
  handleClick(e) {
    if (this.state.open) {
      return;
    }
    this.openMenu();
  }
  handleOutsideClick = (e) => {
    if (this._dropdown.contains(e.target) || !this.state.open) {
      return;
    }
    this.closeMenu(
      this.props.onBlur instanceof Function ? this.props.onBlur(this, e) : null
    );
  }
  handleChange(target, e) {
    this.setState({
      message: this.state.message,
      valid: true,
      value: target.props.value,
      valueContent: this.renderChild(target, false),
      open: false
    }, function() {
      if (this.props.onChange instanceof Function) {
        this.props.onChange(this, e);
      }
    }.bind(this, e));
  }
  openMenu() {
    this.setState(Object.assign({}, this.state, {
      open: true
    })); 
  }
  closeMenu(callback = () => {}) {
    this.setState(
      Object.assign({}, this.state, {
        open: false,
        valid: this.validate()
      }),
      callback instanceof Function ? callback() : null
    );
  }
  validate() {
    return !(this.props.require && !this.state.value);
  }
  getName() {
    return this.props.name;
  }
  getValue() {
    return this.state.value;
  }
}

export default exportComponent(Dropdown, 'dropdown');
