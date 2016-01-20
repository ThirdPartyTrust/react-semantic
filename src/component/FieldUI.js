import React, { PropTypes } from 'react';
import classNames from 'classnames';

export default class FieldUI extends Component {
  static propTypes = {
    label: PropTypes.string,
    validate: PropTypes.any,
    validateMessage: PropTypes.string,
    require: PropTypes.bool,
    requireMessage: PropTypes.string
  };
  static defaultProps = {
    require: false,
    requireMessage: 'This field is required',
    validateMessage: 'This field is invalid',
  };
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value,
      message: this.props.requireMessage,
      valid: true
    };
  }
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
  buildFieldClassName() {
    return classNames({
      required: this.props.require,
      field: true,
      error: !this.state.valid
    });
  }
  renderFieldLabel() {
    if (this.props.label) {
      return (
        <label>{this.props.label}</label>
      );
    }
  }
}
