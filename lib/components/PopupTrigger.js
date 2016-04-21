'use strict';

exports.__esModule = true;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _documentOffset = require('document-offset');

var _documentOffset2 = _interopRequireDefault(_documentOffset);

var _decorators = require('../decorators');

var PopupTrigger = (function (_Component) {
  _inherits(PopupTrigger, _Component);

  function PopupTrigger() {
    _classCallCheck(this, _PopupTrigger);

    _Component.apply(this, arguments);

    this.state = {
      contentVisible: false,
      mouseOverContent: false,
      contentStyle: {
        display: 'block',
        visibility: 'hidden'
      },
      popupStyle: {
        height: null,
        width: null
      }
    };
    this.validTrigger = ['click', 'hover', 'focus'];
    this.validPlacement = ['top', 'bottom', 'left', 'right'];
  }

  PopupTrigger.prototype.componentDidMount = function componentDidMount() {
    if (!this._portal) {
      this._portal = document.createElement('div');
      document.body.appendChild(this._portal);
    }
    this.DOMRender();
  };

  PopupTrigger.prototype.componentDidUpdate = function componentDidUpdate() {
    this.DOMRender();
  };

  PopupTrigger.prototype.DOMRender = function DOMRender() {
    _reactDom2['default'].render(this.renderPopupContent(), this._portal);
  };

  PopupTrigger.prototype.componentWillUnmount = function componentWillUnmount() {
    document.body.removeChild(this._portal);
  };

  PopupTrigger.prototype.render = function render() {
    var _this = this;

    var Trigger = this.props.renderAs;
    return _react2['default'].createElement(Trigger, _extends({}, this.props, {
      content: null,
      onClick: this.handleClick.bind(this),
      onMouseEnter: this.handleMouseEnter.bind(this),
      onMouseLeave: this.handleMouseLeave.bind(this),
      ref: function (ref) {
        return _this._popupTrigger = ref;
      }
    }));
  };

  PopupTrigger.prototype.renderPopupContent = function renderPopupContent() {
    var _this2 = this;

    var content = this.props.content;

    if (!content) {
      console.error('react-semantic: PopupTrigger prop "content" required');
      return;
    }
    return _react2['default'].cloneElement(content, {
      transition: content.props.transition || 'scale',
      visible: this.state.contentVisible,
      uiStyle: this.buildPlacementClass(content.props.uiStyle),
      style: _extends({ position: 'absolute' }, this.state.contentStyle),
      ref: function ref(_ref) {
        return _this2._popup = _reactDom2['default'].findDOMNode(_ref);
      },
      onMouseEnter: this.handleContentMouseEnter.bind(this, content),
      onMouseLeave: this.handleContentMouseLeave.bind(this, content)
    });
  };

  PopupTrigger.prototype.buildPlacementClass = function buildPlacementClass(uiStyle) {
    var placement = this.props.placement;

    return _classnames2['default'](uiStyle, {
      top: placement === 'top',
      bottom: placement === 'bottom',
      left: placement === 'left',
      right: placement === 'right',
      center: true
    });
  };

  PopupTrigger.prototype.buildContentStyle = function buildContentStyle() {
    var placement = this.props.placement;
    var _state = this.state;
    var contentStyle = _state.contentStyle;
    var popupStyle = _state.popupStyle;

    var triggerHeight = this._popupTrigger.clientHeight;
    var triggerWidth = this._popupTrigger.clientWidth;
    var popupHeight = popupStyle.height;
    var popupWidth = popupStyle.width;
    if (!popupHeight && !popupWidth) {
      var popupComputedStyle = getComputedStyle(this._popup);
      popupHeight = this._popup.offsetHeight + parseInt(popupComputedStyle.marginTop) + parseInt(popupComputedStyle.marginBottom);
      popupWidth = this._popup.offsetWidth + parseInt(popupComputedStyle.marginLeft) + parseInt(popupComputedStyle.marginRight);
      this.setState(_extends({}, this.state, {
        popupStyle: {
          height: popupHeight,
          width: popupWidth
        }
      }));
    }
    var triggerOffset = _documentOffset2['default'](this._popupTrigger);
    var style = { top: 0, left: 0 };
    if (placement === 'bottom') {
      style = {
        top: triggerOffset.top + triggerHeight,
        left: triggerOffset.left - 250 / 2 + triggerWidth / 2
      };
    }
    if (placement === 'right') {
      style = {
        top: triggerOffset.top - popupHeight / 2 + triggerHeight / 2,
        left: triggerOffset.left + triggerWidth
      };
    }
    if (placement === 'left') {
      style = {
        top: triggerOffset.top - popupHeight / 2 + triggerHeight / 2,
        left: triggerOffset.left - popupWidth
      };
    }
    if (placement === 'top') {
      style = {
        top: triggerOffset.top - popupHeight,
        left: triggerOffset.left - popupWidth / 2 + triggerWidth / 2
      };
    }
    return style;
  };

  PopupTrigger.prototype.handleClick = function handleClick() {
    var _props = this.props;
    var trigger = _props.trigger;
    var onClick = _props.onClick;

    if (trigger !== 'click') {
      return;
    }
    this.setState({
      contentVisible: !this.state.contentVisible,
      contentStyle: this.buildContentStyle()
    });
    if (onClick instanceof Function) {
      onClick();
    }
  };

  PopupTrigger.prototype.handleMouseEnter = function handleMouseEnter() {
    var _props2 = this.props;
    var trigger = _props2.trigger;
    var onMouseEnter = _props2.onMouseEnter;

    if (trigger !== 'hover') {
      return;
    }
    var timeout = window.setTimeout(this.setState({
      contentVisible: true,
      contentStyle: this.buildContentStyle()
    }, function () {
      window.clearTimeout(timeout);
    }), this.props.delay.show);
    if (onMouseEnter instanceof Function) {
      onMouseEnter();
    }
  };

  PopupTrigger.prototype.handleMouseLeave = function handleMouseLeave() {
    var _this3 = this;

    var _props3 = this.props;
    var trigger = _props3.trigger;
    var onMouseLeave = _props3.onMouseLeave;
    var contentHoverable = _props3.contentHoverable;
    var hide = this.props.delay.hide;

    if (trigger !== 'hover') {
      return;
    }
    var timeout = window.setTimeout(function () {
      if (_this3.state.mouseOverContent) {
        return;
      }
      _this3.setState(_extends({}, _this3.state, {
        contentVisible: false
      }), function () {
        window.clearTimeout(timeout);
      });
    }, contentHoverable && hide <= 0 ? 300 : hide);
    if (onMouseLeave instanceof Function) {
      onMouseLeave();
    }
  };

  PopupTrigger.prototype.handleContentMouseEnter = function handleContentMouseEnter(content) {
    var onMouseEnter = content.props.onMouseEnter;

    this.setState(_extends({}, this.state, {
      mouseOverContent: true
    }));
    if (!onMouseEnter) {
      return;
    }
    onMouseEnter();
  };

  PopupTrigger.prototype.handleContentMouseLeave = function handleContentMouseLeave(content) {
    var _this4 = this;

    var onMouseLeave = content.props.onMouseLeave;

    this.setState(_extends({}, this.state, {
      mouseOverContent: false
    }), function () {
      _this4.handleMouseLeave();
    });
    if (!onMouseLeave) {
      return;
    }
    onMouseLeave();
  };

  _createClass(PopupTrigger, null, [{
    key: 'propTypes',
    value: {
      trigger: _react.PropTypes.string,
      placement: _react.PropTypes.string,
      content: _react.PropTypes.any,
      contentHoverable: _react.PropTypes.bool,
      delay: _react.PropTypes.shape({
        show: _react.PropTypes.number,
        hide: _react.PropTypes.number
      }),
      renderAs: _react.PropTypes.string
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      trigger: 'click',
      placement: 'top',
      contentHoverable: false,
      delay: {
        show: 0,
        hide: 0
      },
      renderAs: 'div'
    },
    enumerable: true
  }]);

  var _PopupTrigger = PopupTrigger;
  PopupTrigger = _decorators.UIComponent()(PopupTrigger) || PopupTrigger;
  return PopupTrigger;
})(_react.Component);

exports['default'] = PopupTrigger;
module.exports = exports['default'];