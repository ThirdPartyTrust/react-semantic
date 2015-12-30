import React, { PropTypes } from 'react';
import transitions from './constants/transitions';

export default function exportComponent(Component, uiElement) {
  
  class UIComponent extends React.Component {
    static propTypes = {
      uiStyle: PropTypes.string,
      className: PropTypes.string,
      transition: PropTypes.string
    };
    constructor(props) {
      super(props);
      this.state = {};
      this._component = null;
    }
    render() {
      return (
        <Component ref={(ref) => this._component = ref} className={this.buildStyle()} {...this.props} {...this.state}/>
      );
    }
    buildStyle() {
      let uiElementStyle = this.buildElementStyle(uiElement);
      let elementStyle = uiElementStyle ? ` ${uiElementStyle}` : '';
      let uiStyle = this.props.uiStyle ? ` ${this.props.uiStyle}` : '';
      let uiElementClass = uiElement ? ` ${uiElement}` : '';
      let className = this.props.className ? ` ${this.props.className}` : '';
      return `ui${elementStyle}${uiStyle}${uiElementClass}${className}`;
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
    buildInputStyle() {
      var labelCount = 0;
      var iconCount = 0;
      var classString = '';
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
