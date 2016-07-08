import React, { Component, PropTypes } from 'react'
import config from './config'

export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired
  };

  render() {
    return (
      <div className="page__wrapper">
        {this.props.children}
      </div>
    )
  }
}
