import React, { Component, PropTypes } from 'react';
import { Input } from './';

export default class Textarea extends Component {
  static propTypes = {
    uiStyle: PropTypes.string,
    className: PropTypes.string
  }
  render() {
    return(
      <Input
        {...this.props}
        type="textarea"
        ref={(ref) => this._textarea = ref}
      />
    )
  }
  validate() {
    return this._textarea.validate();
  }
  getName() {
    return this._textarea.getName();
  }
  getValue() {
    return this._textarea.getValue();
  }
}
