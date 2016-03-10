import React, { Component, PropTypes } from 'react';
import { UIComponent } from '../decorators';

@UIComponent('form')

export default class Form extends Component {
  static propTypes = {
    uiStyle: PropTypes.string,
    onSubmit: PropTypes.func.isRequired,
    disabled: PropTypes.bool
  }
  static defaultProps = {
    onSubmit: () => {},
    disabled: false
  }
  handleSubmit(e) {
    e.preventDefault();
    if (this.props.onSubmit instanceof Function) {
      this.props.onSubmit(e);
    }
  }
  render() {
    return (
      <form
        {...this.props}
        onSubmit={this.handleSubmit.bind(this)}
      >
        <fieldset
          disabled={this.props.disabled}
          style={{border: 'none'}}
        >
          {this.props.children}
        </fieldset>
      </form>
    );
  }
}
