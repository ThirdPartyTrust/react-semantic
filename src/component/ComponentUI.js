import React, { PropTypes } from 'react';
import transitions from '../constants/transitions';
import classNames from 'classnames';

export default class ComponentUI extends React.Component {
  static propTypes = {
    uiStyle: PropTypes.string,
    className: PropTypes.string,
    transition: PropTypes.string,
    transitionActive: PropTypes.bool,
    onTransitionStart: PropTypes.func,
    onTransitionEnd: PropTypes.func,
    visible: PropTypes.bool
  };
  static defaultProps = {
    visible: true,
    transitionActive: false
  }
  constructor(props, Component, componentName) {
    super(props);
    this.state = {
      visible: true,
      transitionActive: props.transitionActive
    };
    this.Component = Component;
    this._componentName = componentName;
    this._component = null;
    this._transitionTimeout = null;
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.transitionActive !== this.state.transitionActive) {
      this.setState({
        visible: this.state.visible,
        transitionActive: nextProps.transitionActive
      });
    }
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
    let styles = [
      this.buildElementStyle(this._componentName),
      uiStyle,
      this._componentName,
      className,
      this.buildTransitionStyle()
    ];
    return classNames('ui', styles);
  }
  buildElementStyle(uiElement) {
    let styleFunctions = {
      input: this.buildInputStyle
    };
    if (!styleFunctions[uiElement] || !this.props.children) {
      return;
    }
    return styleFunctions[uiElement].bind(this);
  }
  buildInputStyle() {
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
    return classNames({
      right: labelCount > 1,
      labeled: labelCount >= 1,
      icon: iconCount > 0 && labelCount <=1
    });
  }
  buildTransitionStyle() {
    if (!this.props.transition) {
      return;
    }
    if (!transitions[this.props.transition]) {
      return;
    }
    let toggleVisible = transitions[this.props.transition].toggleVisible;
    if (this.state.transitionActive) {
      this.setTransitionTimeout(toggleVisible);
    }
    return classNames('transition', {
      visible: this.state.visible || this.state.transitionActive,
      hidden: !this.state.visible && !this.state.transitionActive && toggleVisible,
      animating: this.state.transitionActive,
      in: !this.state.visible && this.state.transitionActive && toggleVisible,
      out: this.state.visible && this.state.transitionActive && toggleVisible,
      [this.props.transition]: this.state.transitionActive
    });
  }
  setTransitionTimeout(toggleVisible) {
    window.clearTimeout(this._transitionTimeout);
    if (this.props.onTransitionStart instanceof Function) {
      this.props.onTransitionStart();
    }
    this._transitionTimeout = window.setTimeout(() => {
      this.setState({
        visible: toggleVisible ? !this.state.visible : this.state.visible,
        transitionActive: !this.state.transitionActive
      });
      if (this.props.onTransitionEnd instanceof Function) {
        this.props.onTransitionEnd();
      }
    }.bind(this), 300);
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
