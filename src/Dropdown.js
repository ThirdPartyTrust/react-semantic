import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { exportComponent, Menu, Label } from './';
import classNames from 'classnames';

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
      open: false,
      transition: 'slide down',
      renderHeight: null
    }
    this._dropdown = null;
    this._menu = null;
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.valid !== this.state.valid) {
      this.setState(Object.assign({}, this.state, {valid: nextProps.valid}));
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
        <div className={this.buildFieldClassName()}>
          {this.renderFieldLabel()}
          <div
            className={this.buildDropdownClassName()}
            onClick={this.handleClick.bind(this)}
            ref={(ref) => this._dropdown = ref}
          >
            <i className="dropdown icon" onClick={this.state.open ? this.closeMenu.bind(this) : null}></i>
            <div className={this.props.select && !this.state.valueContent ? 'default text' : 'text'}>
              {this.state.valueContent ? this.state.valueContent : this.props.placeholder}
            </div>
            <Menu
              transition={this.state.transition}
              visible={this.state.open}
              style={!this.state.renderHeight ? {display:'block', visibility: 'hidden'} : null}
              ref={(ref) => this._menu = ref}
            >
              {this.renderChildren()}
            </Menu>
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
  buildDropdownClassName() {
    return classNames(this.props.className, {
      active: this.state.open,
      visible: this.state.open,
      upward: this.state.transition === 'slide up'
    });
  }
  renderValidationLabel() {
    if (this.props.require) {
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
    let renderHeight = this.state.renderHeight;
    let offsetValues = this._dropdown.getBoundingClientRect();
    let transition = this.state.transition;
    let menuEl = ReactDOM.findDOMNode(this._menu);
    if (!renderHeight) {
      renderHeight = menuEl.offsetHeight;
    }
    if ((window.innerHeight - renderHeight) < offsetValues.bottom) {
      transition = 'slide up';
    } else {
      transition = 'slide down';
    }
    this.setState(Object.assign({}, this.state, {
      transition: transition, renderHeight: renderHeight
    }), () => {
      this.openMenu();
    }.bind(this));
  }
  handleOutsideClick = (e) => {
    if (!this._dropdown) {
      return;
    }
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
      open: false,
      transition: this.state.transition
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
  validate(silent = false) {
    let isValid = !(this.props.require && !this.state.value);
    if (silent) {
      return isValid;
    }
    this.setState(
      Object.assign({}, this.state, {
        valid: isValid
      })
    );
    return isValid;
  }
  getName() {
    return this.props.name;
  }
  getValue() {
    return this.state.value;
  }
}

export default exportComponent(Dropdown, 'dropdown');
