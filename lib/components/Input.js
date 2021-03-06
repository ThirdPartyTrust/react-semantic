'use strict';

exports.__esModule = true;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _ = require('../');

var _decorators = require('../decorators');

var Input = (function (_Component) {
  _inherits(Input, _Component);

  _createClass(Input, null, [{
    key: 'propTypes',
    value: {
      uiStyle: _react.PropTypes.string,
      className: _react.PropTypes.string,
      type: _react.PropTypes.string,
      name: _react.PropTypes.string,
      validate: _react.PropTypes.any,
      validateMessage: _react.PropTypes.string,
      validateOnChange: _react.PropTypes.bool,
      require: _react.PropTypes.bool,
      requireMessage: _react.PropTypes.string,
      requireOnChange: _react.PropTypes.bool,
      label: _react.PropTypes.any,
      value: _react.PropTypes.any,
      placeholder: _react.PropTypes.any,
      onChange: _react.PropTypes.func,
      onBlur: _react.PropTypes.func,
      disabled: _react.PropTypes.bool,
      readOnly: _react.PropTypes.bool,
      maxLength: _react.PropTypes.number,
      rows: _react.PropTypes.number,
      cols: _react.PropTypes.number,
      defaultValue: _react.PropTypes.any,
      valid: _react.PropTypes.bool
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      type: 'text',
      require: false,
      requireMessage: 'This field is required',
      validateMessage: 'This field is invalid',
      requireOnChange: true,
      validateOnChange: true,
      disabled: false,
      readOnly: false
    },
    enumerable: true
  }]);

  function Input(props) {
    _classCallCheck(this, _Input);

    _Component.call(this, props);
    this.state = {
      value: this.props.value || this.props.defaultValue,
      message: this.props.requireMessage,
      valid: true
    };
    this._validTypes = ['text', 'number', 'textarea', 'password'];
    this._changeTimeout = null;
    this._input = null;
  }

  Input.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (nextProps.value && nextProps.value !== this.state.value) {
      this.setState(_extends({}, this.state, {
        value: nextProps.value
      }));
    }
  };

  Input.prototype.render = function render() {
    return _react2['default'].createElement(
      'div',
      { className: this.buildFieldClassName() },
      this.renderFieldLabel(),
      _react2['default'].createElement(
        'div',
        { className: this.props.className },
        this.renderInputByType(),
        this.props.children
      ),
      this.renderValidationLabel()
    );
  };

  Input.prototype.buildFieldClassName = function buildFieldClassName() {
    return _classnames2['default']({
      required: this.props.require,
      field: true,
      error: !this.state.valid
    });
  };

  Input.prototype.renderFieldLabel = function renderFieldLabel() {
    if (this.props.label) {
      return _react2['default'].createElement(
        'label',
        null,
        this.props.label
      );
    }
  };

  Input.prototype.renderInputByType = function renderInputByType() {
    var _this = this;

    if (this.props.type === 'textarea') {
      return _react2['default'].createElement('textarea', _extends({}, this.props, {
        value: this.state.value,
        children: null,
        onFocus: this.handleOnFocus.bind(this),
        onBlur: this.handleOnBlur.bind(this),
        onChange: this.handleOnChange.bind(this),
        ref: function (ref) {
          return _this._input = ref;
        }
      }));
    } else {
      return _react2['default'].createElement('input', _extends({}, this.props, {
        value: this.state.value,
        children: null,
        onFocus: this.handleOnFocus.bind(this),
        onBlur: this.handleOnBlur.bind(this),
        onChange: this.handleOnChange.bind(this),
        ref: function (ref) {
          return _this._input = ref;
        }
      }));
    }
  };

  Input.prototype.renderValidationLabel = function renderValidationLabel() {
    if (this.props.validate || this.props.require) {
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

  Input.prototype.handleOnBlur = function handleOnBlur(e) {
    if (this.props.onBlur instanceof Function) {
      this.props.onBlur(this, e);
    }
    this.validateOnBlur();
  };

  Input.prototype.validateOnBlur = function validateOnBlur() {
    if (!this.props.require && this.state.valid) {
      return;
    }
    this.validate();
  };

  Input.prototype.handleOnFocus = function handleOnFocus() {
    if (this.props.validateOnChange) {
      return;
    }
    this.setState(_extends({}, this.state, {
      valid: true
    }));
  };

  Input.prototype.handleOnChange = function handleOnChange(e) {
    var _this2 = this;

    this.setState(_extends({}, this.state, {
      value: e.target.value
    }), function () {
      if (_this2.props.onChange instanceof Function) {
        _this2.props.onChange(_this2, e);
      }
      if (!_this2.props.validateOnChange && _this2.state.valid) {
        return;
      }
      window.clearTimeout(_this2._changeTimeout);
      _this2._changeTimeout = window.setTimeout(_this2.validate(), 300);
    });
  };

  Input.prototype.validate = function validate() {
    var valid = true;
    if (this.props.require) {
      valid = this.validateRequire(this.state.value);
    }
    if (this._validTypes.indexOf(this.props.type) > -1 && this.props.validate && valid) {
      if (this.props.validate instanceof RegExp) {
        valid = this.validatePattern(this.state.value);
      } else if (this.props.validate instanceof Function) {
        valid = this.validateFunction(this.state.value);
      }
    }
    return valid;
  };

  Input.prototype.validateRequire = function validateRequire(value) {
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
  };

  Input.prototype.validatePattern = function validatePattern(value) {
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
  };

  Input.prototype.validateFunction = function validateFunction(value) {
    if (!value) {
      return true;
    }
    var isValid = this.props.validate(value);
    if (typeof isValid !== 'boolean') {
      return true;
    }
    this.setState({
      value: this.state.value,
      message: !isValid ? this.props.validateMessage : this.state.message,
      valid: isValid
    });
    return isValid;
  };

  Input.prototype.getName = function getName() {
    return this.props.name;
  };

  Input.prototype.getValue = function getValue() {
    if (!this._input) {
      return null;
    }
    return this.state.value;
  };

  var _Input = Input;
  Input = _decorators.UIComponent('input')(Input) || Input;
  return Input;
})(_react.Component);

exports['default'] = Input;
module.exports = exports['default'];