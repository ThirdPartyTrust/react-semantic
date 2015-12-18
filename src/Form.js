import React, { Component, PropTypes } from 'react';
import { exportComponent } from './';

class Form extends Component {
  static propTypes = {
    uiStyle: PropTypes.string,
    className: PropTypes.string,
    onSubmit: PropTypes.func.isRequired,
    validateOnSubmit: PropTypes.bool,
    disabled: PropTypes.bool,
    formData: PropTypes.object
  };
  static defaultProps = {
    onSubmit: function(){},
    validateOnSubmit: true,
    disabled: false
  };
  constructor(props) {
    super(props);
    this.state = {
      formData: this.props.formData,
      formError: this.props.formError
    };
  }
  handleSubmit(e) {
    e.preventDefault();
    if (this.props.onSubmit instanceof Function) {
      this.props.onSubmit(this.props.formData, e);
    }
  }
  render() {
    return (
      <form
        className={this.props.className}
        onSubmit={this.handleSubmit.bind(this)}
      >
        <fieldset
          disabled={this.state.disabled}
          style={{border: 'none'}}
        >
          {this.props.children}
        </fieldset>
      </form>
    );
  }
}

export default exportComponent(Form, 'form');
