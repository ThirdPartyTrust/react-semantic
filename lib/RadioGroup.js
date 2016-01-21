'use strict';

exports.__esModule = true;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ = require('./');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var RadioGroup = (function (_Component) {
  _inherits(RadioGroup, _Component);

  function RadioGroup() {
    _classCallCheck(this, RadioGroup);

    _Component.apply(this, arguments);
  }

  RadioGroup.prototype.render = function render() {
    return _react2['default'].createElement(
      'div',
      { className: 'ui form' },
      _react2['default'].createElement(
        'div',
        { className: this.buildFieldClassName() },
        this.renderFieldLabel(),
        this.props.children
      )
    );
  };

  RadioGroup.prototype.buildFieldClassName = function buildFieldClassName() {
    return _classnames2['default']({
      required: this.props.require,
      field: true,
      error: !this.state.valid
    });
  };

  RadioGroup.prototype.renderFieldLabel = function renderFieldLabel() {
    if (this.props.label) {
      return _react2['default'].createElement(
        'label',
        null,
        this.props.label
      );
    }
  };

  _createClass(RadioGroup, null, [{
    key: 'propTypes',
    value: {
      uiStyle: _react.PropTypes.string,
      className: _react.PropTypes.string,
      require: _react.PropTypes.bool,
      requireMessage: _react.PropTypes.string,
      label: _react.PropTypes.string
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      require: false,
      requireMessage: 'This field is required'
    },
    enumerable: true
  }]);

  return RadioGroup;
})(_react.Component);

exports['default'] = RadioGroup;
module.exports = exports['default'];