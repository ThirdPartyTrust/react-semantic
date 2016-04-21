import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import offset from 'document-offset';
import { UIComponent } from '../decorators';

@UIComponent()

export default class PopupTrigger extends Component {
  static propTypes = {
    trigger: PropTypes.string,
    placement: PropTypes.string,
    content: PropTypes.any,
    contentHoverable: PropTypes.bool,
    delay: PropTypes.shape({
      show: PropTypes.number,
      hide: PropTypes.number
    }),
    renderAs: PropTypes.string
  }
  static defaultProps = {
    trigger: 'click',
    placement: 'top',
    contentHoverable: false,
    delay: {
      show: 0,
      hide: 0
    },
    renderAs: 'div'
  }
  state = {
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
  }
  validTrigger = [
    'click', 'hover', 'focus'
  ]
  validPlacement = [
    'top', 'bottom', 'left', 'right'
  ]
  componentDidMount() {
    if (!this._portal) {
      this._portal = document.createElement('div');
      document.body.appendChild(this._portal);
    }
    this.DOMRender();
  }
  componentDidUpdate() {
    this.DOMRender();
  }
  DOMRender() {
    ReactDOM.render(
      this.renderPopupContent(),
      this._portal
    );
  }
  componentWillUnmount() {
    document.body.removeChild(this._portal);
  }
  render() {
    let Trigger = this.props.renderAs;
    return (
      <Trigger
        {...this.props}
        content={null}
        onClick={this.handleClick.bind(this)}
        onMouseEnter={this.handleMouseEnter.bind(this)}
        onMouseLeave={this.handleMouseLeave.bind(this)}
        ref={ref => this._popupTrigger = ref}
      />
    );
  }
  renderPopupContent() {
    const { content } = this.props;
    if (!content) {
      console.error('react-semantic: PopupTrigger prop "content" required');
      return;
    }
    return React.cloneElement(content, {
      transition: content.props.transition || 'scale',
      visible: this.state.contentVisible,
      uiStyle: this.buildPlacementClass(content.props.uiStyle),
      style: Object.assign({position: 'absolute'}, this.state.contentStyle),
      ref: ref => this._popup = ReactDOM.findDOMNode(ref),
      onMouseEnter: this.handleContentMouseEnter.bind(this, content),
      onMouseLeave: this.handleContentMouseLeave.bind(this, content)
    });
  }
  buildPlacementClass(uiStyle) {
    const { placement } = this.props;
    return classNames(uiStyle, {
      top: placement === 'top',
      bottom: placement === 'bottom',
      left: placement === 'left',
      right: placement === 'right',
      center: true
    });
  }
  buildContentStyle() {
    const { placement } = this.props;
    const { contentStyle, popupStyle } = this.state;
    let triggerHeight = this._popupTrigger.clientHeight;
    let triggerWidth = this._popupTrigger.clientWidth;
    let popupHeight = popupStyle.height;
    let popupWidth = popupStyle.width;
    if (!popupHeight && !popupWidth) {
      let popupComputedStyle = getComputedStyle(this._popup);
      popupHeight =
        this._popup.offsetHeight +
        parseInt(popupComputedStyle.marginTop) +
        parseInt(popupComputedStyle.marginBottom);
      popupWidth =
        this._popup.offsetWidth +
        parseInt(popupComputedStyle.marginLeft) +
        parseInt(popupComputedStyle.marginRight);
      this.setState({
        ...this.state,
        popupStyle: {
          height: popupHeight,
          width: popupWidth
        }
      });
    }
    let triggerOffset = offset(this._popupTrigger);
    let style = { top: 0, left: 0 };
    if (placement === 'bottom') {
      style = {
        top: triggerOffset.top + triggerHeight,
        left: triggerOffset.left - 250/2 + triggerWidth/2
      }
    }
    if (placement === 'right') {
      style = {
        top: triggerOffset.top - (popupHeight/2) + (triggerHeight/2),
        left: triggerOffset.left + triggerWidth
      }
    }
    if (placement === 'left') {
      style = {
        top: triggerOffset.top - (popupHeight/2) + (triggerHeight/2),
        left: triggerOffset.left - popupWidth
      }
    }
    if (placement === 'top') {
      style = {
        top: triggerOffset.top - popupHeight,
        left: triggerOffset.left - (popupWidth/2) + (triggerWidth/2)
      }
    }
    return style;
  }
  handleClick() {
    const { trigger, onClick } = this.props;
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
  }
  handleMouseEnter() {
    const { trigger, onMouseEnter } = this.props;
    if (trigger !== 'hover') {
      return;
    }
    let timeout = window.setTimeout(
      this.setState({
        contentVisible: true,
        contentStyle: this.buildContentStyle()
      }, () => {
        window.clearTimeout(timeout);
      }),
      this.props.delay.show
    );
    if (onMouseEnter instanceof Function) {
      onMouseEnter();
    }
  }
  handleMouseLeave() {
    const { trigger, onMouseLeave, contentHoverable } = this.props;
    const { hide } = this.props.delay;
    if (trigger !== 'hover') {
      return;
    }
    let timeout = window.setTimeout(
      () => {
        if (this.state.mouseOverContent) {
          return;
        }
        this.setState({
          ...this.state,
          contentVisible: false
        }, () => {
          window.clearTimeout(timeout);
        })
      },
      contentHoverable && hide <= 0 ? 300 : hide
    );
    if (onMouseLeave instanceof Function) {
      onMouseLeave();
    }
  }
  handleContentMouseEnter(content) {
    const { onMouseEnter } = content.props;
    this.setState({
      ...this.state,
      mouseOverContent: true
    });
    if (!onMouseEnter) {
      return;
    }
    onMouseEnter();
  }
  handleContentMouseLeave(content) {
    const { onMouseLeave } = content.props;
    this.setState({
      ...this.state,
      mouseOverContent: false
    }, () => {
      this.handleMouseLeave();
    });
    if (!onMouseLeave) {
      return;
    }
    onMouseLeave();
  }
}
