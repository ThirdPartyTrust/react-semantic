'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ = require('./');

var Textarea = (function (_Component) {
  _inherits(Textarea, _Component);

  function Textarea() {
    _classCallCheck(this, Textarea);

    _Component.apply(this, arguments);
  }

  Textarea.prototype.render = function render() {
    var _this = this;

    return _react2['default'].createElement(_.Input, _extends({}, this.props, {
      type: 'textarea',
      ref: function (ref) {
        return _this._textarea = ref;
      }
    }));
  };

  Textarea.prototype.validate = function validate() {
    return this._textarea.validate();
  };

  Textarea.prototype.getName = function getName() {
    return this._dropdown.getName();
  };

  Textarea.prototype.getValue = function getValue() {
    return this._dropdown.getValue();
  };

  _createClass(Textarea, null, [{
    key: 'propTypes',
    value: {
      uiStyle: _react.PropTypes.string,
      className: _react.PropTypes.string
    },
    enumerable: true
  }]);

  return Textarea;
})(_react.Component);

exports['default'] = Textarea;
module.exports = exports['default'];