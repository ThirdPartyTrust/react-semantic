'use strict';

exports.__esModule = true;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ = require('./');

var Checkbox = (function (_Component) {
  _inherits(Checkbox, _Component);

  _createClass(Checkbox, null, [{
    key: 'propTypes',
    value: {
      uiStyle: _react.PropTypes.string,
      className: _react.PropTypes.string,
      type: _react.PropTypes.string,
      name: _react.PropTypes.string,
      require: _react.PropTypes.bool,
      requireMessage: _react.PropTypes.string,
      label: _react.PropTypes.string,
      value: _react.PropTypes.string || _react.PropTypes.number,
      onClick: _react.PropTypes.func,
      onChange: _react.PropTypes.func,
      disabled: _react.PropTypes.bool,
      checked: _react.PropTypes.bool
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      type: 'checkbox',
      disabled: false,
      require: false,
      requireMessage: 'This field is required',
      checked: false
    },
    enumerable: true
  }]);

  function Checkbox(props) {
    _classCallCheck(this, Checkbox);

    _Component.call(this, props);
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
      { className: 'ui form' },
      _react2['default'].createElement(
        'div',
        { className: this.buildFieldClassName() },
        _react2['default'].createElement(
          'div',
          {
            className: this.state.checked ? this.props.className : this.props.className + ' checked',
            onClick: this.handleOnClick.bind(this)
          },
          _react2['default'].createElement('input', {
            className: 'hidden',
            type: this.props.type,
            name: this.props.name,
            disabled: this.props.disabled,
            checked: this.state.checked,
            value: this.props.value,
            ref: function (ref) {
              return _this._checkbox = ref;
            }
          }),
          this.renderFieldLabel()
        )
      )
    );
  };

  Checkbox.prototype.buildFieldClassName = function buildFieldClassName() {
    var require = this.props.require ? 'required' : '';
    var error = !this.state.valid ? 'error' : '';
    return require + ' field ' + error;
  };

  Checkbox.prototype.renderFieldLabel = function renderFieldLabel() {
    if (this.props.label) {
      return _react2['default'].createElement(
        'label',
        null,
        this.props.label
      );
    }
  };

  Checkbox.prototype.handleOnClick = function handleOnClick(e) {
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
      if (this.props.onChange instanceof Function) {
        this.props.onChange(this, e);
      }
    }).bind(this, e));
  };

  Checkbox.prototype.validate = function validate() {
    return !(this.props.require && !this.state.checked);
  };

  Checkbox.prototype.getName = function getName() {
    return this.props.name;
  };

  Checkbox.prototype.getValue = function getValue() {
    return this._checkbox.value;
  };

  return Checkbox;
})(_react.Component);

exports['default'] = _.exportComponent(Checkbox, 'checkbox');
module.exports = exports['default'];