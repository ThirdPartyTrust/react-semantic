import React, { Component, PropTypes } from 'react';
import Portal from 'react-portal';
import classNames from 'classnames';

export default class Modal extends Component {
  static propTypes = {
    show: PropTypes.bool,
    closeOnEsc: PropTypes.bool,
    header: PropTypes.string,
    onClose: PropTypes.func,
    bodyClass: PropTypes.string,
    closeIcon: PropTypes.bool
  }
  static defaultProps = {
    show: false,
    closeOnEsc: true,
    header: null,
    onClose: () => {},
    bodyClass: 'modals',
    closeIcon: true
  }
  state = {
    show: this.props.show,
    closing: false
  }
  componentWillReceiveProps(nextProps) {
    if (!nextProps.show && this.state.show) {
      this.close();
    } else {
      this.setState({
        show: nextProps.show,
        closing: this.state.closing
      }, () => {
        this.setBodyClass(true);
      });
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
    });
  }
  setClosing() {
    this.setState({
      show: true,
      closing: true
    });
  }
  setBodyClass(show = true) {
    let bodyClassNames = document.body.className.replace(
      this.props.bodyClass, ''
    );
    document.body.className = classNames(bodyClassNames, {
      [this.props.bodyClass]: show
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
      <Portal isOpened={this.state.show}>
        <div style={{display: !this.state.show ? 'none' : 'block'}}>
          <div className={'ui dimmer modals visible active page transition fade ' + (!this.state.closing ? 'in' : 'out')}>
            <div
              className={'ui standard modal transition visible active scale ' + (!this.state.closing ? 'in' : 'out')}
              style={{top: '20%'}}
            >
              {this.props.closeIcon ? <i className='close icon' onClick={this.close.bind(this)}/> : null }
              {this.setHeader()}
              {this.props.children}
            </div>
          </div>
        </div>
      </Portal>
    );
  }
}
