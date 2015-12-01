'use strict';

exports.__esModule = true;

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

    _React$Component.call(this, props);
    this.state = {
      show: false,
      closing: false
    };
  }

  Modal.prototype.componentWillReceiveProps = function componentWillReceiveProps(newProps) {
    if (!newProps.show && this.state.show) {
      this.close();
    } else {
      this.setState({
        show: newProps.show,
        closing: this.state.closing
      });
    }
  };

  Modal.prototype.close = function close() {
    this.setClosing();
    setTimeout((function () {
      this.setClosed();
    }).bind(this), 500);
  };

  Modal.prototype.setClosed = function setClosed() {
    this.setState({
      show: false,
      closing: false
    }, (function () {
      this.props.onClose();
    }).bind(this));
  };

  Modal.prototype.setClosing = function setClosing() {
    this.setState({
      show: true,
      closing: true
    });
  };

  Modal.prototype.setHeader = function setHeader() {
    if (this.props.header) {
      return _react2['default'].createElement(
        'div',
        { className: 'header' },
        this.props.header
      );
    }
  };

  Modal.prototype.render = function render() {
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
  };

  return Modal;
})(_react2['default'].Component);

exports['default'] = Modal;

Modal.propTypes = {
  show: _react2['default'].PropTypes.bool,
  closeOnEsc: _react2['default'].PropTypes.bool,
  header: _react2['default'].PropTypes.string,
  onClose: _react2['default'].PropTypes.func
};

Modal.defaultProps = {
  show: false,
  closeOnEsc: true,
  header: null,
  onClose: function onClose() {}
};
module.exports = exports['default'];