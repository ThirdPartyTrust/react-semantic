import React, { PropTypes } from 'react';

export default function exportComponent(Component, uiElement) {
  
  class UIComponent extends React.Component {
    static propTypes = {
      uiStyle: PropTypes.string,
      className: PropTypes.string,
      uiElement: PropTypes.string
    };
    static defaultProps = {
      uiElement: uiElement
    };
    constructor(props) {
      super(props);
      this.state = {};
      if (uiElement === 'input') {
        this.buildInputStyle();
      }
    }
    render() {
      return (
        <Component className={this.buildStyle()} {...this.props} {...this.state}/>
      );
    }
    buildStyle() {
      let uiElementStyle = this.buildElementStyle(uiElement);
      return `ui${uiElementStyle ? ' '+uiElementStyle : ''}${this.props.uiStyle ? ' '+this.props.uiStyle : ''}${uiElement ? ' '+uiElement : ''}${this.props.className ? ' '+this.props.className : ''}`;
    }
    buildElementStyle(uiElement) {
      if (!this.props.children) {
        return;
      }
      switch (uiElement) {
        case 'input':
          return this.buildInputStyle();
        case 'form':
          return;
      }
    }
    buildInputStyle() {
      var labelCount = 0;
      var iconCount = 0;
      var classString = '';
      this.props.children.map(child => {
        if (child.props.uiElement === 'label') {
          labelCount++;
        }
        if (child.props.uiElement === 'icon') {
          iconCount++;
        }
      });
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
  }

  return UIComponent;

}
