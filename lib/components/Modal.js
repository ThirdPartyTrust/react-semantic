'use strict';

exports.__esModule = true;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactPortal = require('react-portal');

var _reactPortal2 = _interopRequireDefault(_reactPortal);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var Modal = (function (_Component) {
  _inherits(Modal, _Component);

  function Modal() {
    _classCallCheck(this, Modal);

    _Component.apply(this, arguments);

    this.state = {
      show: false,
      closing: false
    };
  }

  Modal.prototype.componentWillMount = function componentWillMount() {
    this.setStateByProps(this.props);
  };

  Modal.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    this.setStateByProps(nextProps);
  };

  Modal.prototype.componentWillUnmount = function componentWillUnmount() {
    this.setBodyClass(false);
  };

  Modal.prototype.setStateByProps = function setStateByProps(props) {
    var _this = this;

    if (!props.show && this.state.show) {
      this.close();
    } else {
      this.setState({
        show: props.show,
        closing: this.state.closing
      }, function () {
        _this.setBodyClass(props.show);
      });
    }
  };

  Modal.prototype.close = function close() {
    var _this2 = this;

    this.setClosing();
    setTimeout((function () {
      _this2.setClosed();
    }).bind(this), 500);
  };

  Modal.prototype.setClosed = function setClosed() {
    var _this3 = this;

    this.setState({
      show: false,
      closing: false
    }, function () {
      _this3.setBodyClass(false);
      _this3.props.onClose();
    });
  };

  Modal.prototype.setClosing = function setClosing() {
    this.setState({
      show: true,
      closing: true
    });
  };

  Modal.prototype.setBodyClass = function setBodyClass() {
    var _classNames;

    var show = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

    var bodyClassNames = document.body.className.replace(this.props.bodyClass, '');
    document.body.className = _classnames2['default'](bodyClassNames, (_classNames = {}, _classNames[this.props.bodyClass] = show, _classNames));
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
      { isOpened: this.state.show },
      _react2['default'].createElement(
        'div',
        { style: { display: !this.state.show ? 'none' : 'block' } },
        _react2['default'].createElement(
          'div',
          { className: 'ui dimmer modals visible active page transition fade ' + (!this.state.closing ? 'in' : 'out') },
          _react2['default'].createElement(
            'div',
            {
              className: 'ui standard modal transition visible active scale ' + (!this.state.closing ? 'in' : 'out'),
              style: { top: '20%' }
            },
            this.props.closeIcon ? _react2['default'].createElement('i', { className: 'close icon', onClick: this.close.bind(this) }) : null,
            this.setHeader(),
            this.props.children
          )
        )
      )
    );
  };

  _createClass(Modal, null, [{
    key: 'propTypes',
    value: {
      show: _react.PropTypes.bool,
      closeOnEsc: _react.PropTypes.bool,
      header: _react.PropTypes.string,
      onClose: _react.PropTypes.func,
      bodyClass: _react.PropTypes.string,
      closeIcon: _react.PropTypes.bool
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      show: false,
      closeOnEsc: true,
      header: null,
      onClose: function onClose() {},
      bodyClass: 'modals',
      closeIcon: true
    },
    enumerable: true
  }]);

  return Modal;
})(_react.Component);

exports['default'] = Modal;
module.exports = exports['default'];