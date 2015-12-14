'use strict';

exports.__esModule = true;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ = require('./');

var Input = (function (_Component) {
  _inherits(Input, _Component);

  _createClass(Input, null, [{
    key: 'propTypes',
    value: {
      uiStyle: _react.PropTypes.string,
      className: _react.PropTypes.string,
      type: _react.PropTypes.string,
      validate: _react.PropTypes.any,
      validateMessage: _react.PropTypes.string,
      required: _react.PropTypes.bool,
      requiredMessage: _react.PropTypes.string,
      label: _react.PropTypes.string,
      value: _react.PropTypes.string || _react.PropTypes.number,
      placeholder: _react.PropTypes.string || _react.PropTypes.number,
      onChange: _react.PropTypes.func,
      onBlur: _react.PropTypes.func,
      disabled: _react.PropTypes.bool,
      readOnly: _react.PropTypes.bool
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      type: 'text',
      required: false,
      requiredMessage: 'This field is required',
      validateMessage: 'This field is invalid',
      diasbled: false,
      readOnly: false
    },
    enumerable: true
  }]);

  function Input(props) {
    _classCallCheck(this, Input);

    _Component.call(this, props);
    this.state = {
      message: this.props.requiredMessage,
      valid: true
    };
    this._validTypes = ['text', 'number'];
    this._changeTimeout = null;
    this._input = null;
  }

  Input.prototype.render = function render() {
    var _this = this;

    return _react2['default'].createElement(
      'div',
      { className: 'ui form' },
      _react2['default'].createElement(
        'div',
        { className: this.buildFieldClassName() },
        this.renderFieldLabel(),
        _react2['default'].createElement(
          'div',
          { className: this.props.className },
          _react2['default'].createElement('input', {
            type: this.props.type,
            onBlur: this.handleOnBlur.bind(this),
            onChange: this.handleOnChange.bind(this),
            ref: function (ref) {
              return _this._input = ref;
            },
            disabled: this.props.disabled,
            readOnly: this.props.readOnly
          }),
          this.props.children
        ),
        this.renderValidationLabel()
      )
    );
  };

  Input.prototype.buildFieldClassName = function buildFieldClassName() {
    var required = this.props.required ? 'required ' : '';
    var error = this.state.valid ? ' error' : '';
    return required + 'field' + error;
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

  Input.prototype.renderValidationLabel = function renderValidationLabel() {
    if (!this.state.valid && (this.props.validate && this.props.errorMessage || this.props.required)) {
      return _react2['default'].createElement(
        'div',
        { className: 'ui red pointing prompt label transition visible' },
        this.state.message
      );
    }
  };

  Input.prototype.handleOnBlur = function handleOnBlur(e) {
    if (this.props.onBlur instanceof Function) {
      this.props.onBlur(e.target.value, e);
    }
    this.validateOnBlur(e);
  };

  Input.prototype.validateOnBlur = function validateOnBlur(e) {
    if (!this.props.required && this.state.valid) {
      return;
    }
    this.validate();
  };

  Input.prototype.handleOnChange = function handleOnChange(e) {
    if (this.props.onChange instanceof Function) {
      this.props.onChange(e.target.value, e);
    }
    window.clearTimeout(this._changeTimeout);
    this._changeTimeout = window.setTimeout(this.validate.bind(this), 250);
  };

  Input.prototype.validate = function validate() {
    var valid = true;
    if (this.props.required) {
      valid = this.validateRequired(this._input.value);
    }
    if (this._validTypes.indexOf(this.props.type) > -1 && this.props.validate && valid) {
      valid = this.validatePattern(this._input.value);
    }
    return valid;
  };

  Input.prototype.validateRequired = function validateRequired(value) {
    if (this._validTypes.indexOf(this.props.type) > -1 && value <= 0) {
      this.setState({
        message: this.props.requiredMessage,
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
  };

  Input.prototype.validatePattern = function validatePattern(value) {
    if (value.search(this.props.validate) < 0) {
      this.setState({
        message: this.props.validateMessage,
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
  };

  return Input;
})(_react.Component);

exports['default'] = _.exportComponent(Input, 'input');
module.exports = exports['default'];