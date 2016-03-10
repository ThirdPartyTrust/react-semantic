'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

exports['default'] = exportUI;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _constantsVisualEffects = require('../constants/visualEffects');

var _constantsVisualEffects2 = _interopRequireDefault(_constantsVisualEffects);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function exportUI(Component, componentName) {
  var SemanticComponent = (function (_React$Component) {
    _inherits(SemanticComponent, _React$Component);

    _createClass(SemanticComponent, null, [{
      key: 'propTypes',
      value: {
        uiStyle: _react.PropTypes.string,
        className: _react.PropTypes.string,
        transition: _react.PropTypes.string,
        visible: _react.PropTypes.bool,
        onTransitionStart: _react.PropTypes.func,
        onTransitionEnd: _react.PropTypes.func,
        animation: _react.PropTypes.string,
        animate: _react.PropTypes.bool,
        onAnimationStart: _react.PropTypes.func,
        onAnimationEnd: _react.PropTypes.func,
        uiComponent: _react.PropTypes.string
      },
      enumerable: true
    }, {
      key: 'defaultProps',
      value: {
        visible: true,
        animate: false,
        uiComponent: componentName
      },
      enumerable: true
    }]);

    function SemanticComponent(props) {
      _classCallCheck(this, SemanticComponent);

      _React$Component.call(this, props);
      this.state = {
        visible: this.props.visible,
        animating: this.props.animate,
        animation: this.props.transition || this.props.animation
      };
      this._component = null;
      this._animationTimeout = null;
    }

    SemanticComponent.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
      var nextState = {
        visible: this.state.visible,
        animating: this.state.animating,
        animation: this.state.animation
      };
      if (nextProps.visible !== this.state.visible) {
        nextState.visible = nextProps.visible;
      }
      if (this.props.animation && nextProps.animate !== this.state.animating) {
        nextState.animating = nextProps.animate;
        nextState.animation = this.props.animation;
      }
      if (this.props.transition && nextProps.visible !== this.state.visible) {
        nextState.animating = true;
        nextState.animation = this.props.transition;
      }
      this.setState(nextState);
    };

    SemanticComponent.prototype.render = function render() {
      var _this = this;

      return _react2['default'].createElement(Component, _extends({}, this.props, this.state, {
        className: this.buildStyle(),
        ref: function (ref) {
          return _this._component = ref;
        }
      }));
    };

    SemanticComponent.prototype.buildStyle = function buildStyle() {
      var _props = this.props;
      var uiStyle = _props.uiStyle;
      var className = _props.className;

      return _classnames2['default']('ui', [this.buildElementStyle(componentName), uiStyle, componentName, className, this.buildAnimationStyle()]);
    };

    SemanticComponent.prototype.buildElementStyle = function buildElementStyle(uiElement) {
      var styleFunctions = {
        input: this.buildInputStyle,
        sidebar: this.buildSidebarStyle
      };
      if (uiElement in styleFunctions) {
        return styleFunctions[uiElement].apply(this);
      }
      return;
    };

    SemanticComponent.prototype.buildInputStyle = function buildInputStyle() {
      if (!this.props.children) {
        return;
      }
      var labelCount = 0;
      var iconCount = 0;
      if (Array.isArray(this.props.children)) {
        for (var child in this.props.children) {
          if (child.props.uiComponent === 'label') {
            labelCount++;
          }
          if (child.props.uiComponent === 'icon') {
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

    SemanticComponent.prototype.buildSidebarStyle = function buildSidebarStyle() {
      return this.props.direction;
    };

    SemanticComponent.prototype.buildAnimationStyle = function buildAnimationStyle() {
      var _classNames;

      if (!this.state.animation && _constantsVisualEffects2['default'].transitions.indexOf(this.state.animation) === -1 && _constantsVisualEffects2['default'].animations.indexOf(this.state.animation) === -1 && _constantsVisualEffects2['default'].sidebar.indexOf(this.state.animation) === -1) {
        return;
      }
      var isTransition = _constantsVisualEffects2['default'].animations.indexOf(this.state.animation) === -1 && componentName !== 'sidebar';
      if (this.state.animating) {
        this.setAnimationTimeout(isTransition);
      }
      return _classnames2['default']((_classNames = {
        transition: componentName !== 'sidebar',
        visible: this.state.visible || this.state.animating && componentName !== 'sidebar',
        hidden: !this.state.visible && !this.state.animating && isTransition && componentName !== 'sidebar',
        animating: this.state.animating,
        'in': this.state.visible && this.state.animating && isTransition,
        out: !this.state.visible && this.state.animating && isTransition
      }, _classNames[this.state.animation] = componentName === 'sidebar' || this.state.animating, _classNames));
    };

    SemanticComponent.prototype.setAnimationTimeout = function setAnimationTimeout() {
      var _this2 = this;

      var isTransition = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

      window.clearTimeout(this._animationTimeout);
      if (isTransition && this.props.onTransitionStart instanceof Function) {
        this.props.onTransitionStart();
      }
      if (!isTransition && this.props.onAnimationStart instanceof Function) {
        this.props.onAnimationStart();
      }
      this._animationTimeout = window.setTimeout((function (isTransition) {
        _this2.setState({
          visible: _this2.state.visible,
          animating: !_this2.state.animating
        });
        if (isTransition && _this2.props.onTransitionEnd instanceof Function) {
          _this2.props.onTransitionEnd();
        }
        if (!isTransition && _this2.props.onAnimationEnd instanceof Function) {
          _this2.props.onAnimationEnd();
        }
      }).bind(this, isTransition), 300);
    };

    SemanticComponent.prototype.validate = function validate() {
      if (this._component.validate instanceof Function) {
        return this._component.validate();
      } else {
        console.error('react-semantic component ' + uiElement + ' does not have a validate method!');
      }
    };

    SemanticComponent.prototype.getName = function getName() {
      if (this._component.getName instanceof Function) {
        return this._component.getName();
      } else {
        console.error('react-semantic component ' + uiElement + ' does not have a getName method!');
      }
    };

    SemanticComponent.prototype.getValue = function getValue() {
      if (this._component.getValue instanceof Function) {
        return this._component.getValue();
      } else {
        console.error('react-semantic component ' + uiElement + ' does not have a getValue method!');
      }
    };

    return SemanticComponent;
  })(_react2['default'].Component);

  return SemanticComponent;
}

module.exports = exports['default'];