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

function exportComponent(Component, uiElement) {
  var UIComponent = (function (_React$Component) {
    _inherits(UIComponent, _React$Component);

    _createClass(UIComponent, null, [{
      key: 'propTypes',
      value: {
        uiStyle: _react.PropTypes.string,
        className: _react.PropTypes.string
      },
      enumerable: true
    }]);

    function UIComponent(props) {
      _classCallCheck(this, UIComponent);

      _React$Component.call(this, props);
      this.state = {};
      this._component = null;
    }

    UIComponent.prototype.render = function render() {
      var _this = this;

      return _react2['default'].createElement(Component, _extends({ ref: function (ref) {
          return _this._component = ref;
        }, className: this.buildStyle() }, this.props, this.state));
    };

    UIComponent.prototype.buildStyle = function buildStyle() {
      var uiElementStyle = this.buildElementStyle(uiElement);
      var elementStyle = uiElementStyle ? ' ' + uiElementStyle : '';
      var uiStyle = this.props.uiStyle ? ' ' + this.props.uiStyle : '';
      var uiElementClass = uiElement ? ' ' + uiElement : '';
      var className = this.props.className ? ' ' + this.props.className : '';
      return 'ui' + elementStyle + uiStyle + uiElementClass + className;
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

    UIComponent.prototype.buildInputStyle = function buildInputStyle() {
      var labelCount = 0;
      var iconCount = 0;
      var classString = '';
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
      if (labelCount > 1) {
        classString += 'right ';
      }
      if (labelCount >= 1) {
        classString += 'labeled ';
      }
      if (iconCount > 0 && labelCount <= 1) {
        classString += 'icon ';
      }
      return classString;
    };

    UIComponent.prototype.validate = function validate() {
      if (this._component.validate instanceof Function) {
        return this._component.validate();
      } else {
        console.error('react-semantic component ' + uiElement + ' does not have a validate method!');
      }
    };

    return UIComponent;
  })(_react2['default'].Component);

  return UIComponent;
}

module.exports = exports['default'];