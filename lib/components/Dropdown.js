'use strict';

exports.__esModule = true;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _keycode = require('keycode');

var _keycode2 = _interopRequireDefault(_keycode);

var _ = require('../');

var _decorators = require('../decorators');

var Dropdown = (function (_Component) {
  _inherits(Dropdown, _Component);

  _createClass(Dropdown, null, [{
    key: 'propTypes',
    value: {
      uiStyle: _react.PropTypes.string,
      className: _react.PropTypes.string,
      require: _react.PropTypes.bool,
      name: _react.PropTypes.string,
      requireMessage: _react.PropTypes.string,
      label: _react.PropTypes.any,
      value: _react.PropTypes.any,
      onChange: _react.PropTypes.func,
      onBlur: _react.PropTypes.func,
      defaultValue: _react.PropTypes.any,
      disabled: _react.PropTypes.bool,
      readOnly: _react.PropTypes.bool,
      placeholder: _react.PropTypes.any,
      select: _react.PropTypes.bool
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      require: false,
      requireMessage: 'This field is required',
      disabled: false,
      readOnly: false,
      select: false,
      tabIndex: 0
    },
    enumerable: true
  }]);

  function Dropdown(props) {
    _classCallCheck(this, _Dropdown);

    _Component.call(this, props);
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

  Dropdown.prototype.componentWillMount = function componentWillMount() {
    window.addEventListener('click', this.handleOutsideClick.bind(this), true);
  };

  Dropdown.prototype.componentWillUnmount = function componentWillUnmount() {
    window.removeEventListener('click', this.handleOutsideClick.bind(this), true);
  };

  Dropdown.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    // if (nextProps.children && this.props.defaultValue) {
    //   this.setState(Object.assign({}, this.state, {
    //     valueContent: this.renderDefaultValue(this.props.defaultValue)
    //   }));
    // }
  };

  Dropdown.prototype.render = function render() {
    var _this = this;

    return _react2['default'].createElement(
      'div',
      { className: this.buildFieldClassName() },
      this.renderFieldLabel(),
      _react2['default'].createElement(
        'div',
        _extends({}, this.props, {
          tabIndex: this.props.select ? 0 : -1,
          className: this.buildDropdownClassName(),
          onClick: this.handleClick.bind(this),
          onFocus: this.handleClick.bind(this),
          onBlur: this.handleBlur.bind(this), f: true,
          onKeyDown: this.handleKeyDown.bind(this),
          ref: function (ref) {
            return _this._dropdown = ref;
          }
        }),
        _react2['default'].createElement(_.Icon, { uiStyle: 'dropdown', onClick: this.state.open ? this.closeMenu.bind(this) : null }),
        this.state.valueContent,
        _react2['default'].createElement(
          _.Menu,
          {
            transition: this.state.transition,
            visible: this.state.open,
            style: !this.state.renderHeight ? { display: 'block', visibility: 'hidden' } : null,
            ref: function (ref) {
              return _this._menu = ref;
            }
          },
          this.renderItems()
        )
      ),
      this.renderValidationLabel()
    );
  };

  Dropdown.prototype.buildFieldClassName = function buildFieldClassName() {
    return _classnames2['default']({
      required: this.props.require,
      field: true,
      error: !this.state.valid
    });
  };

  Dropdown.prototype.renderFieldLabel = function renderFieldLabel() {
    if (this.props.label) {
      return _react2['default'].createElement(
        'label',
        null,
        this.props.label
      );
    }
  };

  Dropdown.prototype.buildDropdownClassName = function buildDropdownClassName() {
    return _classnames2['default'](this.props.className, {
      disabled: this.props.disabled,
      active: this.state.open,
      visible: this.state.open,
      upward: this.state.transition === 'slide up'
    });
  };

  Dropdown.prototype.renderValidationLabel = function renderValidationLabel() {
    if (this.props.require) {
      return _react2['default'].createElement(
        _.Label,
        {
          uiStyle: 'red pointing prompt',
          transition: 'scale',
          visible: !this.state.valid
        },
        this.state.message
      );
    }
  };

  Dropdown.prototype.renderItems = function renderItems() {
    var _this2 = this;

    if (!this.props.children) {
      return;
    }
    if (!Array.isArray(this.props.children)) {
      return this.renderItem(this.props.children);
    }
    return this.props.children.map(function (item) {
      return _this2.renderItem(item);
    });
  };

  Dropdown.prototype.renderItem = function renderItem(item) {
    var bindChange = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];
    var value = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];
    var placeholder = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];

    var val = value ? value : this.state.value;
    var selected = val === item.props.value;
    return _react2['default'].createElement(
      'div',
      {
        className: _classnames2['default']('item', { 'active selected': selected }),
        onClick: bindChange ? this.handleChange.bind(this, item) : this.closeMenu.bind(this),
        key: 'dropdown_option_' + item.props.value
      },
      this.renderItemChildren(item.props.children, placeholder)
    );
  };

  Dropdown.prototype.renderItemChildren = function renderItemChildren(children) {
    var placeholder = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

    if (!Array.isArray(children) || !placeholder) {
      return children;
    }
    return children.filter(function (child) {
      if (!child.props) {
        return true;
      }
      return !child.props.ignoreInPlaceholder;
    });
  };

  Dropdown.prototype.renderDefaultValue = function renderDefaultValue() {
    var _this3 = this;

    var valueComponent = null;
    if (!this.props.children) {
      return valueComponent;
    }
    if (Array.isArray(this.props.children)) {
      this.props.children.map(function (child) {
        if (child.props.value === _this3.props.defaultValue) {
          valueComponent = _this3.renderItem(child, false, _this3.props.defaultValue, true);
        }
      });
    } else {
      if (this.props.children.props.value === this.props.defaultValue) {
        valueComponent = this.renderItem(child, false, this.props.defaultValue, true);
      }
    }
    return valueComponent;
  };

  Dropdown.prototype.handleClick = function handleClick(e) {
    var _this4 = this;

    if (this.state.open) {
      return;
    }
    if (this.props.disabled === true || this.props.readOnly === true) {
      return;
    }
    var _state = this.state;
    var renderHeight = _state.renderHeight;
    var transition = _state.transition;

    var offsetValues = this._dropdown.getBoundingClientRect();
    if (!renderHeight) {
      renderHeight = this._menu.offsetHeight;
    }
    if (window.innerHeight - renderHeight < offsetValues.bottom) {
      transition = 'slide up';
    } else {
      transition = 'slide down';
    }
    this.setState(_extends({}, this.state, {
      transition: transition, renderHeight: renderHeight
    }), function () {
      _this4.openMenu();
    });
  };

  Dropdown.prototype.handleBlur = function handleBlur(e) {
    this.closeMenu(this.props.onBlur instanceof Function ? this.props.onBlur(this, e) : null);
  };

  Dropdown.prototype.handleOutsideClick = function handleOutsideClick(e) {
    if (!this._dropdown) {
      return;
    }
    if (this._dropdown.contains(e.target) || !this.state.open) {
      return;
    }
    this.closeMenu();
  };

  Dropdown.prototype.handleChange = function handleChange(target, e) {
    this.setState({
      message: this.state.message,
      valid: true,
      value: target.props.value,
      valueContent: this.renderItem(target, false, target.props.value, true),
      open: false,
      transition: this.state.transition
    }, (function () {
      if (this.props.onChange instanceof Function) {
        this.props.onChange(this, e);
      }
    }).bind(this, e));
  };

  Dropdown.prototype.handleKeyDown = function handleKeyDown(e) {
    var keyVal = _keycode2['default'](e);
    var focusedOptionKey = this.state.focusedOptionKey;

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
    var focusedChild = this.props.children[focusedOptionKey];
    if (!focusedChild) {
      return;
    }
    this.setState(_extends({}, this.state, {
      value: focusedChild.props.value,
      focusedOptionKey: focusedOptionKey,
      valueContent: this.renderItem(focusedChild, false, focusedChild.props.value, true)
    }));
  };

  Dropdown.prototype.findOptionKey = function findOptionKey(keyVal) {
    var key = -1;
    for (var i = 0; i < this.props.children.length; i++) {
      var childVal = this.props.children[i].props.value;
      if (childVal.charAt(0).toLowerCase() == keyVal) {
        key = i;
        break;
      }
    }
    return key;
  };

  Dropdown.prototype.openMenu = function openMenu() {
    this.setState(_extends({}, this.state, {
      open: true
    }));
  };

  Dropdown.prototype.closeMenu = function closeMenu() {
    var callback = arguments.length <= 0 || arguments[0] === undefined ? function () {} : arguments[0];

    this.setState(_extends({}, this.state, {
      open: false,
      valid: this.validate()
    }), callback instanceof Function ? callback() : null);
  };

  Dropdown.prototype.validate = function validate() {
    var silent = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

    var isValid = !(this.props.require && !this.state.value && this.state.value !== 0);
    if (silent) {
      return isValid;
    }
    this.setState(_extends({}, this.state, {
      valid: isValid
    }));
    return isValid;
  };

  Dropdown.prototype.getName = function getName() {
    return this.props.name;
  };

  Dropdown.prototype.getValue = function getValue() {
    if (this.props.disabled === true) {
      return null;
    }
    return this.state.value;
  };

  var _Dropdown = Dropdown;
  Dropdown = _decorators.UIComponent('dropdown')(Dropdown) || Dropdown;
  return Dropdown;
})(_react.Component);

exports['default'] = Dropdown;
module.exports = exports['default'];