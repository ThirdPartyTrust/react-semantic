import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import { Menu, Label } from '../';
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
    placeholder: PropTypes.any,
    select: PropTypes.bool
  }
  static defaultProps = {
    require: false,
    requireMessage: 'This field is required',
    disabled: false,
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
      renderHeight: null
    }
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
      <div className="ui form">
        <div className={this.buildFieldClassName()}>
          {this.renderFieldLabel()}
          <div
            {...this.props}
            className={this.buildDropdownClassName()}
            onClick={this.handleClick.bind(this)}
            ref={ref => this._dropdown = ref}
          >
            <i className="dropdown icon" onClick={this.state.open ? this.closeMenu.bind(this) : null}></i>
            {this.state.valueContent}
            <Menu
              transition={this.state.transition}
              visible={this.state.open}
              style={!this.state.renderHeight ? {display:'block', visibility: 'hidden'} : null}
              ref={ref => this._menu = ref}
            >
              {this.renderItems()}
            </Menu>
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
  renderItems() {
    if (!this.props.children) {
      return;
    }
    if (!Array.isArray(this.props.children)) {
      return this.renderItem(this.props.children);
    }
    return this.props.children.map(item => {
      return this.renderItem(item);
    }.bind(this));
  }
  renderItem(item, bindChange = true, value = false, placeholder = false) {
    let val = value ? value : this.state.value;
    let selected = val === item.props.value;
    return (
      <div
        className={selected ? 'item active selected' : 'item'}
        onClick={bindChange ? this.handleChange.bind(this, item) : this.closeMenu.bind(this)}
        key={`dropdown_option_${item.props.value}`}
      >
        {this.renderItemChildren(item.props.children, placeholder)}
      </div>
    );
  }
  renderItemChildren(children, placeholder = false) {
    if(!Array.isArray(children) || !placeholder) {
      return children;
    }
    return children.filter(child => {
      if (!child.props) {
        return true;
      }
      return !child.props.ignoreInPlaceholder
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
          valueComponent = this.renderItem(child, false, this.props.defaultValue, true)
        }
      }.bind(this))
    } else {
      if (this.props.children.props.value === this.props.defaultValue) {
        valueComponent = this.renderItem(child, false, this.props.defaultValue, true)
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
    return this.state.value;
  }
}
