'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactPortal = require('react-portal');

var _reactPortal2 = _interopRequireDefault(_reactPortal);

var Modal = (function (_React$Component) {
  _inherits(Modal, _React$Component);

  function Modal(props) {
    _classCallCheck(this, Modal);

    _get(Object.getPrototypeOf(Modal.prototype), 'constructor', this).call(this, props);
    this.state = {
      show: props.show,
      closing: false
    };
  }

  _createClass(Modal, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      if (!newProps.show) {
        this.close();
      } else {
        this.setState({
          show: newProps.show,
          closing: this.state.closing
        });
      }
    }
  }, {
    key: 'close',
    value: function close() {
      this.setClosing();
      setTimeout((function () {
        this.setClosed();
      }).bind(this), 500);
    }
  }, {
    key: 'setClosed',
    value: function setClosed() {
      this.setState({
        show: false,
        closing: false
      });
    }
  }, {
    key: 'setClosing',
    value: function setClosing() {
      this.setState({
        show: true,
        closing: true
      });
    }
  }, {
    key: 'setHeader',
    value: function setHeader() {
      if (this.props.header) {
        return _react2['default'].createElement(
          'div',
          { className: 'header' },
          this.props.header
        );
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2['default'].createElement(
        _reactPortal2['default'],
        {
          isOpened: this.state.show,
          closeOnEsc: this.props.closeOnEsc
        },
        _react2['default'].createElement(
          'div',
          { className: 'ui dimmer modals visible active page transition fade ' + (!this.state.closing ? 'in' : 'out') },
          _react2['default'].createElement(
            'div',
            {
              className: 'ui standard test modal transition visible active scale ' + (!this.state.closing ? 'in' : 'out'),
              style: { top: '20%' }
            },
            _react2['default'].createElement('i', { className: 'close icon', onClick: this.close.bind(this) }),
            this.setHeader(),
            this.props.children
          )
        )
      );
    }
  }]);

  return Modal;
})(_react2['default'].Component);

exports['default'] = Modal;

Modal.propTypes = {
  show: _react2['default'].PropTypes.bool,
  closeOnEsc: _react2['default'].PropTypes.bool,
  header: _react2['default'].PropTypes.string
};

Modal.defaultProps = {
  show: false,
  closeOnEsc: true,
  header: null
};
module.exports = exports['default'];