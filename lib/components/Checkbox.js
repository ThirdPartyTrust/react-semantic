'use strict';

exports.__esModule = true;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _decorators = require('../decorators');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var Checkbox = (function (_Component) {
  _inherits(Checkbox, _Component);

  function Checkbox() {
    _classCallCheck(this, _Checkbox);

    _Component.apply(this, arguments);

    this.state = {
      valid: true,
      checked: this.props.checked
    };
  }

  Checkbox.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (nextProps.checked != this.state.checked) {
      this.setState({
        valid: this.state.valid,
        checked: nextProps.checked
      });
    }
  };

  Checkbox.prototype.render = function render() {
    var _this = this;

    return _react2['default'].createElement(
      'div',
      {
        style: this.props.style,
        className: this.buildFieldClassName()
      },
      _react2['default'].createElement(
        'div',
        {
          className: this.buildInputClassName(),
          onClick: this.handleOnClick.bind(this)
        },
        _react2['default'].createElement('input', {
          className: 'hidden',
          type: this.props.type,
          name: this.props.name,
          disabled: this.props.disabled || this.props.readOnly,
          checked: this.state.checked,
          value: this.props.value,
          ref: function (ref) {
            return _this._checkbox = ref;
          }
        }),
        this.renderFieldLabel(),
        this.renderValidationLabel()
      )
    );
  };

  Checkbox.prototype.buildFieldClassName = function buildFieldClassName() {
    return _classnames2['default']({
      required: this.props.require,
      field: true,
      error: !this.state.valid
    });
  };

  Checkbox.prototype.buildInputClassName = function buildInputClassName() {
    return _classnames2['default'](this.props.className, {
      checked: this.state.checked
    });
  };

  Checkbox.prototype.renderFieldLabel = function renderFieldLabel() {
    return _react2['default'].createElement(
      'label',
      null,
      this.props.label
    );
  };

  Checkbox.prototype.renderValidationLabel = function renderValidationLabel() {
    if (!this.state.valid) {
      return _react2['default'].createElement(
        'div',
        { className: 'ui red pointing prompt label transition visible' },
        this.props.requireMessage
      );
    }
  };

  Checkbox.prototype.handleOnClick = function handleOnClick(e) {
    if (this.props.disabled || this.props.readOnly) {
      return;
    }
    if (this.props.onClick instanceof Function) {
      var continueDefault = this.props.onClick(this, e);
      if (continueDefault === false) {
        return;
      }
    }
    this.setState({
      valid: this.state.valid,
      checked: !this.state.checked
    }, (function () {
      this.validate();
      if (this.props.onChange instanceof Function) {
        this.props.onChange(this, e);
      }
    }).bind(this, e));
  };

  Checkbox.prototype.validate = function validate() {
    var valid = !(this.props.require && !this.state.checked);
    if (valid !== this.state.valid) {
      this.setState({
        valid: valid,
        checked: this.state.checked
      });
    }
    return valid;
  };

  Checkbox.prototype.getName = function getName() {
    return this.props.name;
  };

  Checkbox.prototype.getValue = function getValue() {
    return this.state.checked;
  };

  _createClass(Checkbox, null, [{
    key: 'propTypes',
    value: {
      uiStyle: _react.PropTypes.string,
      className: _react.PropTypes.string,
      type: _react.PropTypes.string,
      name: _react.PropTypes.string,
      require: _react.PropTypes.bool,
      requireMessage: _react.PropTypes.string,
      label: _react.PropTypes.node,
      value: _react.PropTypes.string || _react.PropTypes.number,
      onClick: _react.PropTypes.func,
      onChange: _react.PropTypes.func,
      disabled: _react.PropTypes.bool,
      readOnly: _react.PropTypes.bool,
      checked: _react.PropTypes.bool
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      type: 'checkbox',
      disabled: false,
      readOnly: false,
      require: false,
      requireMessage: 'This field is required',
      checked: false,
      label: ''
    },
    enumerable: true
  }]);

  var _Checkbox = Checkbox;
  Checkbox = _decorators.UIComponent('checkbox')(Checkbox) || Checkbox;
  return Checkbox;
})(_react.Component);

exports['default'] = Checkbox;
module.exports = exports['default'];