'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _decorators = require('../decorators');

var Form = (function (_Component) {
  _inherits(Form, _Component);

  function Form() {
    _classCallCheck(this, _Form);

    _Component.apply(this, arguments);
  }

  Form.prototype.handleSubmit = function handleSubmit(e) {
    e.preventDefault();
    if (this.props.onSubmit instanceof Function) {
      this.props.onSubmit(e);
    }
  };

  Form.prototype.render = function render() {
    return _react2['default'].createElement(
      'form',
      _extends({}, this.props, {
        onSubmit: this.handleSubmit.bind(this)
      }),
      _react2['default'].createElement(
        'fieldset',
        {
          disabled: this.props.disabled,
          style: { border: 'none' }
        },
        this.props.children
      )
    );
  };

  _createClass(Form, null, [{
    key: 'propTypes',
    value: {
      uiStyle: _react.PropTypes.string,
      onSubmit: _react.PropTypes.func.isRequired,
      disabled: _react.PropTypes.bool
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      onSubmit: function onSubmit() {},
      disabled: false
    },
    enumerable: true
  }]);

  var _Form = Form;
  Form = _decorators.UIComponent('form')(Form) || Form;
  return Form;
})(_react.Component);

exports['default'] = Form;
module.exports = exports['default'];