import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

export default class Modal extends Component {
  static propTypes = {
    show: PropTypes.bool,
    closeOnEsc: PropTypes.bool,
    header: PropTypes.string,
    onClose: PropTypes.func,
    bodyClass: PropTypes.string
  };
  static defaultProps = {
    show: false,
    closeOnEsc: true,
    header: null,
    onClose: () => {},
    bodyClass: 'modals'
  };
  constructor(props) {
    super(props);
    this.state = {
      show: this.props.show,
      closing: false
    };
    this._modal = null;
  }
  componentWillReceiveProps(newProps) {
    if (!newProps.show && this.state.show) {
      this.close();
    } else {
      this.setState({
        show: newProps.show,
        closing: this.state.closing
      }, () => {
        this.setBodyClass();
      }.bind(this));
    }
  }
  componentWillUnmount() {
    this.setBodyClass(false);
  }
  close() {
    this.setClosing();
    setTimeout(() => {
      this.setClosed();
    }.bind(this), 500);
  }
  setClosed() {
    this.setState({
      show: false,
      closing: false
    }, () => {
      this.setBodyClass();
      this.props.onClose();
    }.bind(this));
  }
  setClosing() {
    this.setState({
      show: true,
      closing: true
    });
  }
  setBodyClass(show = null) {
    let showState = show === null ? this.state.show : show;
    let bodyClassNames = document.body.className.replace(
      this.props.bodyClass, ''
    );
    document.body.className = classNames(bodyClassNames, {
      [this.props.bodyClass]: showState
    });
  }
  setHeader() {
    if (this.props.header) {
      return (
        <div className="header">
          {this.props.header}
        </div>
      );
    }
  }
  render() {
    return (
      <div style={{display: !this.state.show ? 'none' : 'block'}}>
        <div className={'ui dimmer modals visible active page transition fade ' + (!this.state.closing ? 'in' : 'out')}>
          <div
            className={'ui standard modal transition visible active scale ' + (!this.state.closing ? 'in' : 'out')}
            style={{top: '20%'}}
            ref={(ref) => this._modal = ref}
          >
            <i className='close icon' onClick={this.close.bind(this)}></i>
            {this.setHeader()}
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}
