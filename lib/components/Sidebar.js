'use strict';

exports.__esModule = true;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _decorators = require('../decorators');

var Sidebar = (function (_Component) {
  _inherits(Sidebar, _Component);

  function Sidebar() {
    _classCallCheck(this, _Sidebar);

    _Component.apply(this, arguments);
  }

  Sidebar.prototype.render = function render() {
    return _react2['default'].createElement('div', this.props);
  };

  _createClass(Sidebar, null, [{
    key: 'propTypes',
    value: {
      uiStyle: _react.PropTypes.string,
      direction: _react.PropTypes.string,
      onOutsideClick: _react.PropTypes.func
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      direction: 'left',
      onOutsideClick: function onOutsideClick() {}
    },
    enumerable: true
  }]);

  var _Sidebar = Sidebar;
  Sidebar = _decorators.UIComponent('sidebar')(Sidebar) || Sidebar;
  return Sidebar;
})(_react.Component);

exports['default'] = Sidebar;
module.exports = exports['default'];