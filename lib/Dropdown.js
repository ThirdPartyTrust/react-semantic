'use strict';

exports.__esModule = true;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ = require('./');

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
      label: _react.PropTypes.string,
      value: _react.PropTypes.string,
      onChange: _react.PropTypes.func,
      onBlur: _react.PropTypes.func,
      defaultValue: _react.PropTypes.string,
      disabled: _react.PropTypes.bool,
      placeholder: _react.PropTypes.string,
      select: _react.PropTypes.bool
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      require: false,
      requireMessage: 'This field is required',
      disabled: false,
      select: false
    },
    enumerable: true
  }]);

  function Dropdown(props) {
    var _this = this;

    _classCallCheck(this, Dropdown);

    _Component.call(this, props);

    this.handleOutsideClick = function (e) {
      if (_this._dropdown.contains(e.target) || !_this.state.open) {
        return;
      }
      _this.closeMenu(_this.props.onBlur instanceof Function ? _this.props.onBlur(_this, e) : null);
    };

    this.state = {
      message: this.props.requireMessage,
      valid: true,
      value: null,
      valueContent: null,
      open: false
    };
  }

  Dropdown.prototype.componentWillMount = function componentWillMount() {
    window.addEventListener('click', this.handleOutsideClick.bind(this), true);
  };

  Dropdown.prototype.componentWillUnmount = function componentWillUnmount() {
    window.removeEventListener('click', this.handleOutsideClick.bind(this), true);
  };

  Dropdown.prototype.render = function render() {
    var _this2 = this;

    return _react2['default'].createElement(
      'div',
      { className: 'ui form' },
      _react2['default'].createElement(
        'div',
        { className: this.buildFieldClassName() },
        this.renderFieldLabel(),
        _react2['default'].createElement(
          'div',
          {
            className: '' + this.props.className + (this.state.open ? ' active visible' : ''),
            onClick: this.handleClick.bind(this),
            ref: function (ref) {
              return _this2._dropdown = ref;
            }
          },
          _react2['default'].createElement('i', { className: 'dropdown icon', onClick: this.state.open ? this.closeMenu.bind(this) : null }),
          _react2['default'].createElement(
            'div',
            { className: this.props.select && !this.state.valueContent ? 'default text' : 'text' },
            this.state.valueContent ? this.state.valueContent : this.props.placeholder
          ),
          _react2['default'].createElement(
            'div',
            {
              className: this.state.open ? 'menu active visible' : 'menu',
              style: this.state.open ? { display: 'block' } : {}
            },
            this.renderChildren()
          )
        ),
        this.renderValidationLabel()
      )
    );
  };

  Dropdown.prototype.buildFieldClassName = function buildFieldClassName() {
    var require = this.props.require ? 'required' : '';
    var error = !this.state.valid ? 'error' : '';
    return require + ' field ' + error;
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

  Dropdown.prototype.renderValidationLabel = function renderValidationLabel() {
    if (!this.state.valid && this.props.require) {
      return _react2['default'].createElement(
        'div',
        { className: 'ui red pointing prompt label transition visible' },
        this.state.message
      );
    }
  };

  Dropdown.prototype.renderChildren = function renderChildren() {
    var _this3 = this;

    if (Array.isArray(this.props.children)) {
      return this.props.children.map((function (child) {
        if (child.props.value === _this3.props.defaultValue) {
          _this3.setState(_extends({}, state, {
            valueContent: _this3.renderChild(child, false)
          }));
        }
        return _this3.renderChild(child);
      }).bind(this));
    }
    return this.renderChild(this.props.children);
  };

  Dropdown.prototype.renderChild = function renderChild(child) {
    var bindChange = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

    return _react2['default'].createElement(
      'div',
      {
        className: this.state.value === child.props.value ? 'item active selected' : 'item',
        onClick: bindChange ? this.handleChange.bind(this, child) : this.closeMenu.bind(this)
      },
      child.props.children
    );
  };

  Dropdown.prototype.handleClick = function handleClick(e) {
    if (this.state.open) {
      return;
    }
    this.openMenu();
  };

  Dropdown.prototype.handleChange = function handleChange(target, e) {
    this.setState({
      message: this.state.message,
      valid: true,
      value: target.props.value,
      valueContent: this.renderChild(target, false),
      open: false
    }, (function () {
      if (this.props.onChange instanceof Function) {
        this.props.onChange(this, e);
      }
    }).bind(this, e));
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
    return !(this.props.require && !this.state.value);
  };

  Dropdown.prototype.getName = function getName() {
    return this.props.name;
  };

  Dropdown.prototype.getValue = function getValue() {
    return this.state.value;
  };

  return Dropdown;
})(_react.Component);

exports['default'] = _.exportComponent(Dropdown, 'dropdown');
module.exports = exports['default'];