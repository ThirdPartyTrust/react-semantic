'use strict';

exports.__esModule = true;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _UIComponent = require('./UIComponent');

var _UIComponent2 = _interopRequireDefault(_UIComponent);

var Input = (function (_Component) {
  _inherits(Input, _Component);

  _createClass(Input, null, [{
    key: 'propTypes',
    value: {
      uiStyle: _react.PropTypes.string,
      className: _react.PropTypes.string
    },
    enumerable: true
  }]);

  function Input(props) {
    _classCallCheck(this, Input);

    _Component.call(this, props);
  }

  Input.prototype.render = function render() {
    return _react2['default'].createElement(
      'div',
      { className: this.props.className },
      this.props.children
    );
  };

  return Input;
})(_react.Component);

exports['default'] = Input;
exports['default'] = _UIComponent2['default'](Input, 'input');
module.exports = exports['default'];