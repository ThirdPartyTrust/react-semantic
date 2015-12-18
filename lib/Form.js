'use strict';

exports.__esModule = true;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ = require('./');

var Form = (function (_Component) {
  _inherits(Form, _Component);

  _createClass(Form, null, [{
    key: 'propTypes',
    value: {
      uiStyle: _react.PropTypes.string,
      className: _react.PropTypes.string,
      onSubmit: _react.PropTypes.func.isRequired,
      validateOnSubmit: _react.PropTypes.bool,
      disabled: _react.PropTypes.bool,
      formData: _react.PropTypes.object
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      onSubmit: function onSubmit() {},
      validateOnSubmit: true,
      disabled: false
    },
    enumerable: true
  }]);

  function Form(props) {
    _classCallCheck(this, Form);

    _Component.call(this, props);
    this.state = {
      formData: this.props.formData,
      formError: this.props.formError
    };
  }

  Form.prototype.handleSubmit = function handleSubmit(e) {
    e.preventDefault();
    if (this.props.onSubmit instanceof Function) {
      this.props.onSubmit(this.props.formData, e);
    }
  };

  Form.prototype.render = function render() {
    return _react2['default'].createElement(
      'form',
      {
        className: this.props.className,
        onSubmit: this.handleSubmit.bind(this)
      },
      _react2['default'].createElement(
        'fieldset',
        {
          disabled: this.state.disabled,
          style: { border: 'none' }
        },
        this.props.children
      )
    );
  };

  return Form;
})(_react.Component);

exports['default'] = _.exportComponent(Form, 'form');
module.exports = exports['default'];