'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _ = require('../');

var Toggle = (function (_Component) {
  _inherits(Toggle, _Component);

  function Toggle() {
    _classCallCheck(this, Toggle);

    _Component.apply(this, arguments);
  }

  Toggle.prototype.render = function render() {
    var _this = this;

    return _react2['default'].createElement(
      _.Checkbox,
      _extends({}, this.props, {
        uiStyle: _classnames2['default'](this.props.uiStyle, 'toggle'),
        ref: function (ref) {
          return _this._checkbox = ref;
        }
      }),
      this.props.children
    );
  };

  Toggle.prototype.validate = function validate() {
    return this._checkbox.validate();
  };

  Toggle.prototype.getName = function getName() {
    return this._checkbox.getName();
  };

  Toggle.prototype.getValue = function getValue() {
    return this._checkbox.getValue();
  };

  _createClass(Toggle, null, [{
    key: 'propTypes',
    value: {
      uiStyle: _react.PropTypes.string
    },
    enumerable: true
  }]);

  return Toggle;
})(_react.Component);

exports['default'] = Toggle;
module.exports = exports['default'];