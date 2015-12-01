import React, { Component, PropTypes } from 'react';

export default class Form extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    disabled: PropTypes.bool
  };
  static defaultProps = {
    onSubmit: function(){}
  };
  constructor(props) {
    super(props);
    this.state = {
      formData: this.props.formData,
      formError: this.props.formError
    };
  }
  submit(e) {
    e.preventDefault();
    this.props.onSubmit(formData, callback);
  }
  render() {
    return (
      <form
        className={this.props.className}
        onSubmit={this.handleSubmit.bind(this)}
      >
        <fieldset disabled={this.state.disabled}>
          {this.props.children}
        </fieldset>
      </form>
    );
  }
}