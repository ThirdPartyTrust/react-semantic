'use strict';

exports.__esModule = true;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _decorators = require('../decorators');

var _ = require('../');

var Pushable = (function (_Component) {
  _inherits(Pushable, _Component);

  function Pushable() {
    _classCallCheck(this, _Pushable);

    _Component.apply(this, arguments);

    this.pushableComponents = ['pusher', 'sidebar'];
    this.state = {
      pusherStyle: null
    };
  }

  Pushable.prototype.componentWillUpdate = function componentWillUpdate(nextProps, nextState) {
    if (!this.refs.sidebar) {
      return;
    }
    var sidebar = this.findPushableComponent(nextProps.children, 'sidebar');
    if (!sidebar) {
      return;
    }
    var nextPusherStyle = null;
    if (this.refs.sidebar.props.visible !== sidebar.props.visible) {
      if (sidebar.props.visible) {
        var sidebarDOM = _reactDom2['default'].findDOMNode(this.refs.sidebar);
        var offsetWidth = sidebarDOM.offsetWidth;

        nextPusherStyle = {
          WebkitTransform: 'translate3d(' + offsetWidth + 'px, 0, 0)',
          transform: 'translate3d(' + offsetWidth + 'px, 0, 0)'
        };
      }
      if (nextPusherStyle !== this.state.pusherStyle) {
        this.setState({
          pusherStyle: nextPusherStyle
        });
      }
    }
  };

  Pushable.prototype.render = function render() {
    return _react2['default'].createElement(
      'div',
      this.props,
      this.renderChildren()
    );
  };

  Pushable.prototype.renderChildren = function renderChildren() {
    var _this = this;

    var pushableChildren = [];
    return _react.Children.map(this.props.children, function (child) {
      var uiComponent = child.props.uiComponent;
      if (_this.pushableComponents.indexOf(uiComponent) >= 0) {
        if (pushableChildren.indexOf(uiComponent) >= 0) {
          console.error(_this.buildError(uiComponent));
          return child;
        }
        pushableChildren.push(uiComponent);
        var childProps = { ref: uiComponent };
        if (uiComponent === 'pusher') {
          childProps.style = _this.state.pusherStyle;
        }
        return _react2['default'].cloneElement(child, childProps);
      }
      return child;
    });
  };

  Pushable.prototype.findPushableComponent = function findPushableComponent(children, uiComponent) {
    var _this2 = this;

    var component = null;
    _react.Children.forEach(children, function (child) {
      if (child.props.uiComponent === uiComponent) {
        if (!component) {
          component = child;
        } else {
          console.error(_this2.buildError(uiComponent));
        }
      }
    });
    return component;
  };

  Pushable.prototype.buildError = function buildError(uiComponent) {
    return 'react-semantic Pushable is currently only able to watch one ' + uiComponent + ' at a time, additional ' + uiComponent + ' components will be ignored.';
  };

  _createClass(Pushable, null, [{
    key: 'propTypes',
    value: {
      uiStyle: _react.PropTypes.string
    },
    enumerable: true
  }]);

  var _Pushable = Pushable;
  Pushable = _decorators.UIComponent('pushable')(Pushable) || Pushable;
  return Pushable;
})(_react.Component);

exports['default'] = Pushable;
module.exports = exports['default'];