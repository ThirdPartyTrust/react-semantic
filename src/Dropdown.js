import React, { Component, PropTypes } from 'react';
import { exportComponent } from './';

class Dropdown extends Component {
  static propTypes = {
    uiStyle: PropTypes.string,
    className: PropTypes.string,
    required: PropTypes.bool,
    requiredMessage: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    disabled: PropTypes.bool,
    placeholder: PropTypes.string,
    select: PropTypes.bool
  };
  static defaultProps = {
    required: false,
    requiredMessage: 'This field is required',
    disabled: false,
    select: false
  };
  constructor(props) {
    super(props);
    this.state = {
      message: this.props.requiredMessage,
      valid: true,
      value: null,
      valueContent: null,
      open: false
    }
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
        <div className={this.state.valid ? 'field' : 'required field error'}>
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
  renderFieldLabel() {
    if (this.props.label) {
      return (
        <label>{this.props.label}</label>
      );
    }
  }
  renderValidationLabel() {
    if (!this.state.valid && this.props.required) {
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
  renderChild(child, bindChange = true) {
    return (
      <div
        className={this.state.value === child.props.value ? 'item active selected' : 'item'}
        onClick={bindChange ? this.handleChange.bind(this, child) : this.closeMenu.bind(this)}
      >
        {child.props.children}
      </div>
    );
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
    this.closeMenu();
  }
  handleChange(target, e) {
    if (this.props.onChange instanceof Function) {
      this.props.onChange(target.props.value, e);
    }
    this.setState({
      message: this.state.message,
      valid: true,
      value: target.props.value,
      valueContent: this.renderChild(target, false),
      open: false
    });
  }
  openMenu() {
    this.setState(Object.assign({}, this.state, {
      open: true
    })); 
  }
  closeMenu() {
    this.setState(Object.assign({}, this.state, {
      open: false,
      valid: this.validate(false)
    }));
  }
  validate(updateState = true) {
    let valid = !(this.props.required && !this.state.value);
    if (this.state.valid != valid && updateState) {
      this.setState(Object.assign({}, this.state, {
        valid: valid
      }));
    }
    return valid;
  }
}

export default exportComponent(Dropdown, 'dropdown');
