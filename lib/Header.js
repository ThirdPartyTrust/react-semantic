'use strict';

exports.__esModule = true;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ = require('./');

var Header = (function (_Component) {
  _inherits(Header, _Component);

  function Header() {
    var _this = this;

    _classCallCheck(this, Header);

    _Component.apply(this, arguments);

    this.elementMap = {
      h1: function h1() {
        return _react2['default'].createElement(
          'h1',
          _this.props,
          _this.props.children
        );
      },
      h2: function h2() {
        return _react2['default'].createElement(
          'h2',
          _this.props,
          _this.props.children
        );
      },
      h3: function h3() {
        return _react2['default'].createElement(
          'h3',
          _this.props,
          _this.props.children
        );
      },
      h4: function h4() {
        return _react2['default'].createElement(
          'h4',
          _this.props,
          _this.props.children
        );
      },
      h5: function h5() {
        return _react2['default'].createElement(
          'h5',
          _this.props,
          _this.props.children
        );
      },
      div: function div() {
        return _react2['default'].createElement(
          'div',
          _this.props,
          _this.props.children
        );
      }
    };
  }

  Header.prototype.render = function render() {
    var uiElement = this.props.uiElement;

    var el = Object.keys(this.elementMap).indexOf(uiElement) > -1 ? uiElement : 'div';
    return this.elementMap[el]();
  };

  _createClass(Header, null, [{
    key: 'propTypes',
    value: {
      uiElement: _react.PropTypes.string
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      uiElement: 'div'
    },
    enumerable: true
  }]);

  return Header;
})(_react.Component);

exports['default'] = _.exportComponent(Header, 'header');
module.exports = exports['default'];