import React, { Component, PropTypes, Children } from 'react';
import ReactDOM from 'react-dom';
import { UIComponent } from '../decorators';
import { Pusher, Sidebar } from '../';

@UIComponent('pushable')

export default class Pushable extends Component {
  static propTypes = {
    uiStyle: PropTypes.string
  }
  pushableComponents = [
    'pusher', 'sidebar'
  ]
  state = {
    pusherStyle: null
  }
  componentWillUpdate(nextProps, nextState) {
    if (!this.refs.sidebar) {
      return;
    }
    let sidebar = this.findPushableComponent(nextProps.children, 'sidebar');
    if (!sidebar) {
      return;
    }
    let nextPusherStyle = null;
    if (this.refs.sidebar.props.visible !== sidebar.props.visible) {
      if (sidebar.props.visible) {
        let sidebarDOM = ReactDOM.findDOMNode(this.refs.sidebar);
        const { offsetWidth } = sidebarDOM;
        nextPusherStyle = {
          WebkitTransform: `translate3d(${offsetWidth}px, 0, 0)`,
          transform: `translate3d(${offsetWidth}px, 0, 0)`
        };
      }
      if (nextPusherStyle !== this.state.pusherStyle) {
        this.setState({
          pusherStyle: nextPusherStyle
        });
      }
    }
  }
  render() {
    return (
      <div {...this.props}>
        {this.renderChildren()}
      </div>
    );
  }
  renderChildren() {
    let pushableChildren = [];
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
