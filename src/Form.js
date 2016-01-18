import React, { Component, PropTypes } from 'react';
import { exportComponent } from './';

class Form extends Component {
  static propTypes = {
    uiStyle: PropTypes.string,
    className: PropTypes.string,
    onSubmit: PropTypes.func.isRequired,
    disabled: PropTypes.bool
  };
  static defaultProps = {
    onSubmit: () => {},
    disabled: false
  };
  handleSubmit(e) {
    e.preventDefault();
    if (this.props.onSubmit instanceof Function) {
      this.props.onSubmit(e);
    }
  }
  render() {
    return (
      <form
        className={this.props.className}
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

export default exportComponent(Form, 'form');
