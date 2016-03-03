import React, { Component, PropTypes } from 'react';
import { UIComponent } from '../decorators';

@UIComponent('table')

export default class Table extends Component {
  static propTypes = {
    uiStyle: PropTypes.string
  }
  render() {
    return (
      <table {...this.props}/>
    );
  }
}
