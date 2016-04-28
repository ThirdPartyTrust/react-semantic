import React, { Component, PropTypes } from 'react';
import { Dimmer, Icon } from '../';
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
    show: false,
    closing: false
  }
  styles = {
    '.ui.modal': {
      top: '20%',
      position: 'static',
      margin: '0px auto',
      marginTop: '4em',
      marginBottom: '4em'
    },
    '.ui.dimmer.modals': {
      overflow: 'auto'
    }
  }
  componentWillMount() {
    this.setStateByProps(this.props);
    if (this.props.show) {
      document.body.style.overflow = 'hidden';
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setStateByProps(nextProps);
  }
  componentWillUnmount() {
    this.setBodyClass(false);
    document.body.style.overflow = null;
  }
  setStateByProps(props) {
    if (!props.show && this.state.show) {
      this.close();
    } else {
      this.setState({
        show: props.show,
        closing: this.state.closing
      }, () => {
        this.setBodyClass(props.show);
      });
    }
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
      this.setBodyClass(false);
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
  renderCloseIcon() {
    if (!this.props.closeIcon) {
      return;
    }
    return (
      <Icon
        uiStyle="close"
        onClick={this.close.bind(this)}
      />
    );
  }
  render() {
    return (
      <Portal isOpened={this.state.show}>
        <div style={{display: !this.state.show ? 'none' : 'block'}}>
          <Dimmer
            uiStyle={
              classNames('modals visible active page transition fade', {
                'in': !this.state.closing,
                'out': this.state.closing
              })
            }
            style={this.styles['.ui.dimmer.modals']}
          >
            <div
              className={
                classNames('ui standard modal transition visible active scale', {
                  'in': !this.state.closing,
                  'out': this.state.closing
                })
              }
              style={this.styles['.ui.modal']}
            >
              {this.renderCloseIcon()}
              {this.setHeader()}
              {this.props.children}
            </div>
          </Dimmer>
        </div>
      </Portal>
    );
  }
}
