import React from 'react';
import Portal from 'react-portal';

class Modal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      show: props.show,
      closing: false
    };
  }

  componentWillReceiveProps(newProps) {
    if (!newProps.show) {
      this.close();
    } else {
      this.setState({
        show: newProps.show,
        closing: this.state.closing
      });
    }
  }

  close() {
    this.setClosing();
    setTimeout(function(){
      this.setClosed();
    }.bind(this), 500);
  }
  
  setClosed() {
    this.setState({
      show: false,
      closing: false
    });
  }

  setClosing() {
    this.setState({
      show: true,
      closing: true
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
      <Portal
        isOpened={this.state.show}
        closeOnEsc={this.props.closeOnEsc}
      >
        <div className={'ui dimmer modals visible active page transition fade ' + (!this.state.closing ? 'in' : 'out')}>
          <div
            className={'ui standard test modal transition visible active scale ' + (!this.state.closing ? 'in' : 'out')} 
            style={{top: '20%'}}
          >
            <i className='close icon' onClick={this.close.bind(this)}></i>
            {this.setHeader()}
            {this.props.children}
          </div>
        </div>
      </Portal>
    );
  }

}

Modal.propTypes = {
  show: React.PropTypes.bool,
  closeOnEsc: React.PropTypes.bool,
  header: React.PropTypes.string
};

Modal.defaultProps = {
  show: false,
  closeOnEsc: true,
  header: null
};

module.exports = Modal;