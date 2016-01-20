'use strict';

exports.__esModule = true;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var FieldUI = (function (_Component) {
  _inherits(FieldUI, _Component);

  _createClass(FieldUI, null, [{
    key: 'propTypes',
    value: {
      label: _react.PropTypes.string,
      validate: _react.PropTypes.any,
      validateMessage: _react.PropTypes.string,
      require: _react.PropTypes.bool,
      requireMessage: _react.PropTypes.string
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      require: false,
      requireMessage: 'This field is required',
      validateMessage: 'This field is invalid'
    },
    enumerable: true
  }]);

  function FieldUI(props) {
    _classCallCheck(this, FieldUI);

    _Component.call(this, props);
    this.state = {
      value: this.props.value,
      message: this.props.requireMessage,
      valid: true
    };
  }

  FieldUI.prototype.render = function render() {
    return _react2['default'].createElement(
      'div',
      null,
      this.props.children
    );
  };

  FieldUI.prototype.buildFieldClassName = function buildFieldClassName() {
    return _classnames2['default']({
      required: this.props.require,
      field: true,
      error: !this.state.valid
    });
  };

  FieldUI.prototype.renderFieldLabel = function renderFieldLabel() {
    if (this.props.label) {
      return _react2['default'].createElement(
        'label',
        null,
        this.props.label
      );
    }
  };

  return FieldUI;
})(Component);

exports['default'] = FieldUI;
module.exports = exports['default'];