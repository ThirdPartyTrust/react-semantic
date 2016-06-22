import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import keycode from 'keycode';
import { Menu, Label, Icon } from '../';
import { UIComponent } from '../decorators';

@UIComponent('dropdown')

export default class Dropdown extends Component {
  static propTypes = {
    uiStyle: PropTypes.string,
    className: PropTypes.string,
    require: PropTypes.bool,
    name: PropTypes.string,
    requireMessage: PropTypes.string,
    label: PropTypes.any,
    value: PropTypes.any,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    defaultValue: PropTypes.any,
    disabled: PropTypes.bool,
    readOnly: PropTypes.bool,
    placeholder: PropTypes.any,
    select: PropTypes.bool
  }
  static defaultProps = {
    require: false,
    requireMessage: 'This field is required',
    disabled: false,
    readOnly: false,
    select: false,
    tabIndex: 0
  }
  constructor(props) {
    super(props);
    this.state = {
      message: this.props.requireMessage,
      valid: true,
      value: this.props.defaultValue,
      valueContent: this.renderDefaultValue(this.props.defaultValue),
      open: false,
      transition: 'slide down',
      renderHeight: null,
      focusedOptionKey: -1
    };
    this._dropdown = null;
    this._menu = null;
  }
  componentWillMount() {
    window.addEventListener('click', this.handleOutsideClick.bind(this), true);
  }
  componentWillUnmount() {
    window.removeEventListener('click', this.handleOutsideClick.bind(this), true);
  }
  componentWillReceiveProps(nextProps) {
    // if (nextProps.children && this.props.defaultValue) {
    //   this.setState(Object.assign({}, this.state, {
    //     valueContent: this.renderDefaultValue(this.props.defaultValue)
    //   }));
    // }
  }
  render() {
    return (
      <div className={this.buildFieldClassName()}>
        {this.renderFieldLabel()}
        <div
          {...this.props}
          tabIndex={this.props.select ? 0 : -1}
          className={this.buildDropdownClassName()}
          onClick={this.handleClick.bind(this)}
          onFocus={this.handleClick.bind(this)}
          onBlur={this.handleBlur.bind(this)}f
          onKeyDown={this.handleKeyDown.bind(this)}
          ref={ref => this._dropdown = ref}
        >
          <Icon uiStyle="dropdown" onClick={
            this.state.open ? this.closeMenu.bind(this) : null
          }/>
          {this.state.valueContent}
          <Menu
            transition={this.state.transition}
            visible={this.state.open}
            style={!this.state.renderHeight ? {display: 'block', visibility: 'hidden'} : null}
            ref={ref => this._menu = ref}
          >
            {this.renderItems()}
          </Menu>
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
  buildDropdownClassName() {
    return classNames(this.props.className, {
      disabled: this.props.disabled,
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
  renderItems() {
    if (!this.props.children) {
      return;
    }
    if (!Array.isArray(this.props.children)) {
      return this.renderItem(this.props.children);
    }
    return this.props.children.map(item => {
      return this.renderItem(item);
    });
  }
  renderItem(item, bindChange = true, value = false, placeholder = false) {
    let val = value ? value : this.state.value;
    let selected = val === item.props.value;
    return (
      <div
        className={classNames('item', { 'active selected': selected})}
        onClick={bindChange ? this.handleChange.bind(this, item) : this.closeMenu.bind(this)}
        key={`dropdown_option_${item.props.value}`}
      >
        {this.renderItemChildren(item.props.children, placeholder)}
      </div>
    );
  }
  renderItemChildren(children, placeholder = false) {
    if (!Array.isArray(children) || !placeholder) {
      return children;
    }
    return children.filter(child => {
      if (!child.props) {
        return true;
      }
      return !child.props.ignoreInPlaceholder;
    });
  }
  renderDefaultValue() {
    var valueComponent = null;
    if (!this.props.children) {
      return valueComponent;
    }
    if (Array.isArray(this.props.children)) {
      this.props.children.map(child => {
        if (child.props.value === this.props.defaultValue) {
          valueComponent = this.renderItem(child, false, this.props.defaultValue, true);
        }
      });
    } else {
      if (this.props.children.props.value === this.props.defaultValue) {
        valueComponent = this.renderItem(child, false, this.props.defaultValue, true);
      }
    }
    return valueComponent;
  }
  handleClick(e) {
    if (this.state.open) {
      return;
    }
    if (
      this.props.disabled === true
      || this.props.readOnly === true
    ) {
      return;
    }
    let { renderHeight, transition } = this.state;
    const offsetValues = this._dropdown.getBoundingClientRect();
    if (!renderHeight) {
      renderHeight = this._menu.offsetHeight;
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
    });
  }
  handleBlur(e) {
    this.closeMenu(
      this.props.onBlur instanceof Function ? this.props.onBlur(this, e) : null
    );
  }
  handleOutsideClick(e) {
    if (!this._dropdown) {
      return;
    }
    if (this._dropdown.contains(e.target) || !this.state.open) {
      return;
    }
    this.closeMenu();
  }
  handleChange(target, e) {
    this.setState({
      message: this.state.message,
      valid: true,
      value: target.props.value,
      valueContent: this.renderItem(
        target, false, target.props.value, true
      ),
      open: false,
      transition: this.state.transition
    }, function() {
      if (this.props.onChange instanceof Function) {
        this.props.onChange(this, e);
      }
    }.bind(this, e));
  }
  handleKeyDown(e) {
    const keyVal = keycode(e);
    let { focusedOptionKey } = this.state;
    if (keyVal !== 'tab') {
      e.preventDefault();
    }
    if (keyVal === 'down') {
      focusedOptionKey++;
    } else if (keyVal === 'up') {
      focusedOptionKey--;
    } else if (keyVal.length === 1) {
      focusedOptionKey = this.findOptionKey(keyVal);
    } else {
      return;
    }
    const focusedChild = this.props.children[focusedOptionKey];
    if (!focusedChild) {
      return;
    }
    this.setState({
      ...this.state,
      value: focusedChild.props.value,
      focusedOptionKey: focusedOptionKey,
      valueContent: this.renderItem(
        focusedChild, false, focusedChild.props.value, true
      )
    });
  }
  findOptionKey(keyVal) {
    let key = -1;
    for (let i = 0; i < this.props.children.length; i++) {
      let childVal = this.props.children[i].props.value;
      if (childVal.charAt(0).toLowerCase() == keyVal) {
        key = i;
        break;
      }
    }
    return key;
  }
  openMenu() {
    this.setState({
      ...this.state,
      open: true
    });
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
    let isValid = !(this.props.require && !this.state.value && this.state.value !== 0);
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
    if (this.props.disabled === true) {
      return null;
    }
    return this.state.value;
  }
}
