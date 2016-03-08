import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Popup } from '../';
import classNames from 'classnames';
import offset from 'document-offset';

export default class PopupTrigger extends Component {
  static propTypes = {
    trigger: PropTypes.string,
    placement: PropTypes.string,
    content: PropTypes.any
  }
  static defaultProps = {
    trigger: 'click',
    placement: 'top'
  }
  state = {
    contentVisible: false,
    contentStyle: {
      display: 'block',
      visibility: 'hidden'
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
    this.componentDidUpdate();
  }
  componentDidUpdate() {
    ReactDOM.render(this.renderPopupContent(), this._portal);
  }
  componentWillUnmount() {
    document.body.removeChild(this._portal);
  }
  render() {
    return (
      <div
        {...this.props}
        style={{display:'inline-block', ...this.props.style}}
        onClick={this.handleClick.bind(this)}
        onMouseOver={this.handleMouseOver.bind(this)}
        onMouseOut={this.handleMouseOut.bind(this)}
        ref={ref => this._popupTrigger = ref}
      >
        {this.props.children}
      </div>
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
      ref: ref => this._popup = ReactDOM.findDOMNode(ref)
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
    const { contentStyle } = this.state;
    if (contentStyle.top && contentStyle.left) {
      return contentStyle;
    }
    let triggerHeight = this._popupTrigger.clientHeight;
    let triggerWidth = this._popupTrigger.clientWidth;
    let popupStyle = getComputedStyle(this._popup);
    let popupHeight = this._popup.offsetHeight + parseInt(popupStyle.marginTop) + parseInt(popupStyle.marginBottom);
    let popupWidth = this._popup.offsetWidth + parseInt(popupStyle.marginLeft) + parseInt(popupStyle.marginRight);
    let triggerOffset = offset(this._popupTrigger);
    let style = { top: 0, left: 0 };
    if (placement === 'bottom') {
      style = {
        top: triggerOffset.top + popupHeight,
        left: triggerOffset.left - (popupWidth/2) + (triggerWidth/2)
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
  handleMouseOver() {
    const { trigger, onMouseOver } = this.props;
    if (trigger !== 'hover') {
      return;
    }
    this.setState({
      contentVisible: true,
      contentStyle: this.buildContentStyle()
    });
    if (onMouseOver instanceof Function) {
      onMouseOver();
    }
  }
  handleMouseOut() {
    const { trigger, onMouseOut } = this.props;
    if (trigger !== 'hover') {
      return;
    }
    this.setState({
      contentVisible: false,
      contentStyle: this.buildContentStyle()
    });
    if (onMouseOut instanceof Function) {
      onMouseOut();
    }
  }
}
