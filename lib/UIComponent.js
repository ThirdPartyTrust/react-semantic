'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

exports['default'] = exportComponent;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _constantsTransitions = require('./constants/transitions');

var _constantsTransitions2 = _interopRequireDefault(_constantsTransitions);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function exportComponent(Component, uiElement) {
  var UIComponent = (function (_React$Component) {
    _inherits(UIComponent, _React$Component);

    _createClass(UIComponent, null, [{
      key: 'propTypes',
      value: {
        uiStyle: _react.PropTypes.string,
        className: _react.PropTypes.string,
        transition: _react.PropTypes.string,
        transitionActive: _react.PropTypes.bool,
        onTransitionStart: _react.PropTypes.func,
        onTransitionEnd: _react.PropTypes.func,
        visible: _react.PropTypes.bool
      },
      enumerable: true
    }, {
      key: 'defaultProps',
      value: {
        visible: true,
        transitionActive: false
      },
      enumerable: true
    }]);

    function UIComponent(props) {
      _classCallCheck(this, UIComponent);

      _React$Component.call(this, props);
      this.state = {
        visible: true,
        transitionActive: props.transitionActive
      };
      this._component = null;
      this._transitionTimeout = null;
    }

    UIComponent.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
      if (nextProps.transitionActive !== this.state.transitionActive) {
        this.setState({
          visible: this.state.visible,
          transitionActive: nextProps.transitionActive
        });
      }
    };

    UIComponent.prototype.render = function render() {
      var _this = this;

      return _react2['default'].createElement(Component, _extends({ ref: function (ref) {
          return _this._component = ref;
        }, className: this.buildStyle() }, this.props, this.state));
    };

    UIComponent.prototype.buildStyle = function buildStyle() {
      var uiElementStyle = this.buildElementStyle(uiElement);
      var transitionStyle = this.buildTransitionStyle();
      var elementStyle = uiElementStyle ? ' ' + uiElementStyle : '';
      var uiStyle = this.props.uiStyle ? ' ' + this.props.uiStyle : '';
      var uiElementClass = uiElement ? ' ' + uiElement : '';
      var className = this.props.className ? ' ' + this.props.className : '';
      var transitionClass = transitionStyle ? ' ' + transitionStyle : '';
      return 'ui' + elementStyle + uiStyle + uiElementClass + className + transitionClass;
    };

    UIComponent.prototype.buildElementStyle = function buildElementStyle(uiElement) {
      if (!this.props.children) {
        return;
      }
      switch (uiElement) {
        case 'input':
          return this.buildInputStyle();
        default:
          return;
      }
    };

    UIComponent.prototype.buildTransitionStyle = function buildTransitionStyle() {
      var _classNames;

      if (!this.props.transition) {
        return;
      }
      if (!_constantsTransitions2['default'][this.props.transition]) {
        return;
      }
      var toggleVisible = _constantsTransitions2['default'][this.props.transition].toggleVisible;
      if (this.state.transitionActive) {
        this.setTransitionTimeout(toggleVisible);
      }
      return _classnames2['default']('transition', (_classNames = {
        visible: this.state.visible || this.state.transitionActive,
        hidden: !this.state.visible && !this.state.transitionActive,
        animating: this.state.transitionActive,
        'in': !this.state.visible && this.state.transitionActive && toggleVisible,
        out: this.state.visible && this.state.transitionActive && toggleVisible
      }, _classNames[this.props.transition] = this.state.transitionActive, _classNames));
    };

    UIComponent.prototype.setTransitionTimeout = function setTransitionTimeout(toggleVisible) {
      var _this2 = this;

      window.clearTimeout(this._transitionTimeout);
      if (this.props.onTransitionStart instanceof Function) {
        this.props.onTransitionStart();
      }
      this._transitionTimeout = window.setTimeout((function () {
        _this2.setState({
          visible: toggleVisible ? !_this2.state.visible : _this2.state.visible,
          transitionActive: !_this2.state.transitionActive
        });
        if (_this2.props.onTransitionEnd instanceof Function) {
          _this2.props.onTransitionEnd();
        }
      }).bind(this), 300);
    };

    UIComponent.prototype.buildInputStyle = function buildInputStyle() {
      var labelCount = 0;
      var iconCount = 0;
      if (Object.prototype.toString.call(this.props.children) === '[object Array]') {
        this.props.children.map(function (child) {
          if (child.props.uiElement === 'label') {
            labelCount++;
          }
          if (child.props.uiElement === 'icon') {
            iconCount++;
          }
        });
      }
      return _classnames2['default']({
        right: labelCount > 1,
        labeled: labelCount >= 1,
        icon: iconCount > 0 && labelCount <= 1
      });
    };

    UIComponent.prototype.validate = function validate() {
      if (this._component.validate instanceof Function) {
        return this._component.validate();
      } else {
        console.error('react-semantic component ' + uiElement + ' does not have a validate method!');
      }
    };

    UIComponent.prototype.getName = function getName() {
      if (this._component.getName instanceof Function) {
        return this._component.getName();
      } else {
        console.error('react-semantic component ' + uiElement + ' does not have a getName method!');
      }
    };

    UIComponent.prototype.getValue = function getValue() {
      if (this._component.getValue instanceof Function) {
        return this._component.getValue();
      } else {
        console.error('react-semantic component ' + uiElement + ' does not have a getValue method!');
      }
    };

    return UIComponent;
  })(_react2['default'].Component);

  return UIComponent;
}

module.exports = exports['default'];