import React, { Component, PropTypes } from 'react';
import { exportComponent } from './';

class Checkbox extends Component {
  static propTypes = {
    uiStyle: PropTypes.string,
    className: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    require: PropTypes.bool,
    requireMessage: PropTypes.string,
    label: PropTypes.node,
    value: PropTypes.string || PropTypes.number,
    onClick: PropTypes.func,
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
    checked: PropTypes.bool
  };
  static defaultProps = {
    type: 'checkbox',
    disabled: false,
    require: false,
    requireMessage: 'This field is required',
    checked: false,
    label: ''
  };
  constructor(props) {
    super(props);
    this.state = {
      valid: true,
      checked: this.props.checked
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.checked != this.state.checked) {
      this.setState({
        valid: this.state.valid,
        checked: nextProps.checked
      });
    }
  }
  render() {
    return (
      <div className="ui form">
        <div className={this.buildFieldClassName()}>
          <div
            className={this.state.checked ? this.props.className : `${this.props.className} checked`}
            onClick={this.handleOnClick.bind(this)}
          >
            <input
              className="hidden"
              type={this.props.type}
              name={this.props.name}
              disabled={this.props.disabled}
              checked={this.state.checked}
              value={this.props.value}
              ref={(ref) => this._checkbox = ref}
            />
            {this.renderFieldLabel()}
          </div>
        </div>
      </div>
    );
  }
  buildFieldClassName() {
    let require = this.props.require ? 'required' : '';
    let error = !this.state.valid ? 'error' : '';
    return `${require} field ${error}`;
  }
  renderFieldLabel() {
    return (
      <label>{this.props.label}</label>
    );
  }
  handleOnClick(e) {
    if (this.props.onClick instanceof Function) {
      let continueDefault = this.props.onClick(this, e);
      if (continueDefault === false) {
        return;
      }
    }
    this.setState({
      valid: this.state.valid,
      checked: !this.state.checked
    }, function(){
      if (this.props.onChange instanceof Function) {
        this.props.onChange(this, e);
      }
    }.bind(this, e));
  }
  validate() {
    return !(this.props.require && !this.state.checked);
  }
  getName() {
    return this.props.name;
  }
  getValue() {
    return this._checkbox.value;
  }
}

export default exportComponent(Checkbox, 'checkbox');
