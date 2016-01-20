import React, { PropTypes } from 'react';
import transitions from './constants/transitions';
import classNames from 'classnames';

export default function exportComponent(Component, uiElement) {
  
  class UIComponent extends React.Component {
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
    constructor(props) {
      super(props);
      this.state = {
        visible: true,
        transitionActive: props.transitionActive
      };
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
        <Component ref={(ref) => this._component = ref} className={this.buildStyle()} {...this.props} {...this.state}/>
      );
    }
    buildStyle() {
      let uiElementStyle = this.buildElementStyle(uiElement);
      let transitionStyle = this.buildTransitionStyle();
      let elementStyle = uiElementStyle ? ` ${uiElementStyle}` : '';
      let uiStyle = this.props.uiStyle ? ` ${this.props.uiStyle}` : '';
      let uiElementClass = uiElement ? ` ${uiElement}` : '';
      let className = this.props.className ? ` ${this.props.className}` : '';
      let transitionClass = transitionStyle ? ` ${transitionStyle}` : '';
      return `ui${elementStyle}${uiStyle}${uiElementClass}${className}${transitionClass}`;
    }
    buildElementStyle(uiElement) {
      if (!this.props.children) {
        return;
      }
      switch (uiElement) {
        case 'input':
          return this.buildInputStyle();
        default:
          return;
      }
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
        hidden: !this.state.visible && !this.state.transitionActive,
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
    buildInputStyle() {
      var labelCount = 0;
      var iconCount = 0;
      if (Object.prototype.toString.call(this.props.children) === '[object Array]') {
        this.props.children.map(child => {
          if (child.props.uiElement === 'label') {
            labelCount++;
          }
          if (child.props.uiElement === 'icon') {
            iconCount++;
          }
        });
      }
      return classNames({
        right: labelCount > 1,
        labeled: labelCount >= 1,
        icon: iconCount > 0 && labelCount <=1
      });
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

  return UIComponent;

}
