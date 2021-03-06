import React, { PropTypes } from 'react';
import vfx from '../constants/visualEffects';
import classNames from 'classnames';

export default function exportUI(Component, componentName) {
  class SemanticComponent extends React.Component {
    static propTypes = {
      uiStyle: PropTypes.string,
      className: PropTypes.string,
      transition: PropTypes.string,
      visible: PropTypes.bool,
      onTransitionStart: PropTypes.func,
      onTransitionEnd: PropTypes.func,
      animation: PropTypes.string,
      animate: PropTypes.bool,
      onAnimationStart: PropTypes.func,
      onAnimationEnd: PropTypes.func,
      uiComponent: PropTypes.string
    };
    static defaultProps = {
      visible: true,
      animate: false,
      uiComponent: componentName
    };
    constructor(props) {
      super(props);
      this.state = {
        visible: this.props.visible,
        animating: this.props.animate,
        animation: this.props.transition || this.props.animation
      };
      this._component = null;
      this._animationTimeout = null;
    }
    componentWillReceiveProps(nextProps) {
      let nextState = {
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
    }
    render() {
      return (
        <Component
          {...this.props}
          {...this.state}
          className={this.buildStyle()}
          ref={(ref) => this._component = ref}
        />
      );
    }
    buildStyle() {
      const { uiStyle, className } = this.props;
      return classNames('ui', [
        this.buildElementStyle(componentName),
        uiStyle,
        componentName,
        className,
        this.buildAnimationStyle()
      ]);
    }
    buildElementStyle(uiElement) {
      let styleFunctions = {
        input: this.buildInputStyle,
        sidebar: this.buildSidebarStyle
      };
      if (uiElement in styleFunctions) {
        return styleFunctions[uiElement].apply(this);
      }
      return;
    }
    buildInputStyle() {
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
      return classNames({
        right: labelCount > 1,
        labeled: labelCount >= 1,
        icon: iconCount > 0 && labelCount <=1
      });
    }
    buildSidebarStyle() {
      return this.props.direction;
    }
    buildAnimationStyle() {
      if (
        !this.state.animation
        && vfx.transitions.indexOf(this.state.animation) === -1
        && vfx.animations.indexOf(this.state.animation) === -1
        && vfx.sidebar.indexOf(this.state.animation) === -1
      ) {
        return;
      }
      let isTransition = vfx.animations.indexOf(this.state.animation) === -1 && componentName !== 'sidebar';
      if (this.state.animating) {
        this.setAnimationTimeout(isTransition);
      }
      return classNames({
        transition: componentName !== 'sidebar',
        visible: this.state.visible || (this.state.animating && componentName !== 'sidebar'),
        hidden: !this.state.visible && !this.state.animating && isTransition && componentName !== 'sidebar',
        animating: this.state.animating,
        in: this.state.visible && this.state.animating && isTransition,
        out: !this.state.visible && this.state.animating && isTransition,
        [this.state.animation]: componentName === 'sidebar' || this.state.animating
      });
    }
    setAnimationTimeout(isTransition = false) {
      window.clearTimeout(this._animationTimeout);
      if (isTransition && this.props.onTransitionStart instanceof Function) {
        this.props.onTransitionStart();
      }
      if (!isTransition && this.props.onAnimationStart instanceof Function) {
        this.props.onAnimationStart();
      }
      this._animationTimeout = window.setTimeout((isTransition) => {
        this.setState({
          visible: this.state.visible,
          animating: !this.state.animating
        });
        if (isTransition && this.props.onTransitionEnd instanceof Function) {
          this.props.onTransitionEnd();
        }
        if (!isTransition && this.props.onAnimationEnd instanceof Function) {
          this.props.onAnimationEnd();
        }
      }.bind(this, isTransition), 300);
    }
    validate() {
      if (this._component.validate instanceof Function) {
        return this._component.validate();
      } else {
        console.error(`react-semantic component ${uiElement} does not have a validate method!`);
      }
    }
    getName() {
      if (this._component.getName instanceof Function) {
        return this._component.getName();
      } else {
        console.error(`react-semantic component ${uiElement} does not have a getName method!`);
      }
    }
    getValue() {
      if (this._component.getValue instanceof Function) {
        return this._component.getValue();
      } else {
        console.error(`react-semantic component ${uiElement} does not have a getValue method!`);
      }
    }
  }
  return SemanticComponent;
}
