'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _constantsTransitions = require('../constants/transitions');

var _constantsTransitions2 = _interopRequireDefault(_constantsTransitions);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var ComponentUI = (function (_React$Component) {
  _inherits(ComponentUI, _React$Component);

  _createClass(ComponentUI, null, [{
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

  function ComponentUI(props, Component, componentName) {
    _classCallCheck(this, ComponentUI);

    _React$Component.call(this, props);
    this.state = {
      visible: true,
      transitionActive: props.transitionActive
    };
    this.Component = Component;
    this._componentName = componentName;
    this._component = null;
    this._transitionTimeout = null;
  }

  ComponentUI.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (nextProps.transitionActive !== this.state.transitionActive) {
      this.setState({
        visible: this.state.visible,
        transitionActive: nextProps.transitionActive
      });
    }
  };

  ComponentUI.prototype.render = function render() {
    var _this = this;

    return _react2['default'].createElement(Component, _extends({}, this.props, this.state, {
      className: this.buildStyle(),
      ref: function (ref) {
        return _this._component = ref;
      }
    }));
  };

  ComponentUI.prototype.buildStyle = function buildStyle() {
    var _props = this.props;
    var uiStyle = _props.uiStyle;
    var className = _props.className;

    var styles = [this.buildElementStyle(this._componentName), uiStyle, this._componentName, className, this.buildTransitionStyle()];
    return _classnames2['default']('ui', styles);
  };

  ComponentUI.prototype.buildElementStyle = function buildElementStyle(uiElement) {
    var styleFunctions = {
      input: this.buildInputStyle
    };
    if (!styleFunctions[uiElement] || !this.props.children) {
      return;
    }
    return styleFunctions[uiElement].bind(this);
  };

  ComponentUI.prototype.buildInputStyle = function buildInputStyle() {
    var labelCount = 0;
    var iconCount = 0;
    if (Array.isArray(this.props.children)) {
      for (var child in this.props.children) {
        if (child.props.uiElement === 'label') {
          labelCount++;
        }
        if (child.props.uiElement === 'icon') {
          iconCount++;
        }
      };
    }
    return _classnames2['default']({
      right: labelCount > 1,
      labeled: labelCount >= 1,
      icon: iconCount > 0 && labelCount <= 1
    });
  };

  ComponentUI.prototype.buildTransitionStyle = function buildTransitionStyle() {
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
      hidden: !this.state.visible && !this.state.transitionActive && toggleVisible,
      animating: this.state.transitionActive,
      'in': !this.state.visible && this.state.transitionActive && toggleVisible,
      out: this.state.visible && this.state.transitionActive && toggleVisible
    }, _classNames[this.props.transition] = this.state.transitionActive, _classNames));
  };

  ComponentUI.prototype.setTransitionTimeout = function setTransitionTimeout(toggleVisible) {
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

  ComponentUI.prototype.validate = function validate() {
    if (this._component.validate instanceof Function) {
      return this._component.validate();
    } else {
      console.error('react-semantic component ' + uiElement + ' does not have a validate method!');
    }
  };

  ComponentUI.prototype.getName = function getName() {
    if (this._component.getName instanceof Function) {
      return this._component.getName();
    } else {
      console.error('react-semantic component ' + uiElement + ' does not have a getName method!');
    }
  };

  ComponentUI.prototype.getValue = function getValue() {
    if (this._component.getValue instanceof Function) {
      return this._component.getValue();
    } else {
      console.error('react-semantic component ' + uiElement + ' does not have a getValue method!');
    }
  };

  return ComponentUI;
})(_react2['default'].Component);

exports['default'] = ComponentUI;
module.exports = exports['default'];