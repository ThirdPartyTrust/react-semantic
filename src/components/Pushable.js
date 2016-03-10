import React, { Component, PropTypes, Children } from 'react';
import ReactDOM from 'react-dom';
import { UIComponent } from '../decorators';
import { Pusher, Sidebar } from '../';

@UIComponent('pushable')

export default class Pushable extends Component {
  static propTypes = {
    uiStyle: PropTypes.string,
    reactive: PropTypes.bool
  }
  static defaultProps = {
    reactive: true
  }
  pushableComponents = [
    'pusher', 'sidebar'
  ]
  state = {
    pusherStyle: null,
    pusherClass: null
  }
  componentWillUpdate(nextProps, nextState) {
    if (!this.refs.sidebar || !this.props.reactive) {
      return;
    }
    let sidebar = this.findPushableComponent(nextProps.children, 'sidebar');
    if (!sidebar) {
      return;
    }
    let nextPusherStyle = null;
    let nextPusherClass = null;
    if (this.refs.sidebar.props.visible !== sidebar.props.visible) {
      if (sidebar.props.visible) {
        let pusher = this.findPushableComponent(nextProps.children, 'pusher');
        if (!pusher) {
          return;
        }
        nextPusherStyle = this.buildPusherStyle(sidebar);
        nextPusherClass = pusher.props.dimmed ? 'dimmed' : null;
      }
      if (nextPusherStyle !== this.state.pusherStyle) {
        this.setState({
          pusherStyle: nextPusherStyle,
          pusherClass: nextPusherClass
        });
      }
    }
  }
  buildPusherStyle(sidebar) {
    if (!this.refs.sidebar || !sidebar) {
      return;
    }
    const { direction } = sidebar.props;
    const { offsetWidth, offsetHeight } = ReactDOM.findDOMNode(this.refs.sidebar);
    let pusherStyle;
    if (direction === 'left' || direction === 'right') {
      let push = direction === 'right' ? offsetWidth * -1 : offsetWidth;
      pusherStyle = `translate3d(${push}px, 0, 0)`;
    }
    if (direction === 'top' || direction === 'bottom') {
      let push = direction === 'bottom' ? offsetHeight * -1 : offsetHeight;
      pusherStyle = `translate3d(0, ${push}px, 0)`;
    }
    return {
      WebkitTransform: pusherStyle,
      transform: pusherStyle
    };
  }
  resetState() {
    this.setState({
      pusherStyle: null,
      pusherClass: null
    });
  }
  render() {
    return (
      <div {...this.props}>
        {this.renderChildren()}
      </div>
    );
  }
  renderChildren() {
    if (!this.props.reactive) {
      return this.props.children;
    }
    let pushableChildren = [];
    let sidebar = this.findPushableComponent(this.props.children, 'sidebar');
    if (!sidebar) {
      return this.props.children;
    }
    return Children.map(this.props.children, child => {
      let uiComponent = child.props.uiComponent;
      if (this.pushableComponents.indexOf(uiComponent) >= 0) {
        if (pushableChildren.indexOf(uiComponent) >= 0) {
          console.error(this.buildError(uiComponent));
          return child;
        }
        pushableChildren.push(uiComponent);
        let childProps = { ref: uiComponent };
        if (uiComponent === 'pusher') {
          childProps.style = this.state.pusherStyle;
          childProps.uiStyle = this.state.pusherClass;
          childProps.onClick = this.state.pusherStyle ? sidebar.props.onOutsideClick : child.props.onClick;
        }
        return React.cloneElement(child, childProps);
      }
      return child;
    });
  }
  findPushableComponent(children, uiComponent) {
    let component = null;
    Children.forEach(children, child => {
      if (child.props.uiComponent === uiComponent) {
        if (!component) {
          component = child;
        } else {
          console.error(this.buildError(uiComponent));
        }
      }
    });
    return component;
  }
  buildError(uiComponent) {
    return `react-semantic Pushable is currently only able to watch one ${uiComponent} at a time, additional ${uiComponent} components will be ignored.`
  }
}
