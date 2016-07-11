import React, { Component } from 'react'

import PDFJSAnnotate from 'lib/pdf-annotate'
const { UI } = PDFJSAnnotate

export default class Toolbar extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  cursorClick() {
    UI.disableRect()
    UI.enableEdit()
    this.setState({active: 'cursor'})
  }

  highlightClick() {
    UI.disableEdit()
    UI.enableRect('highlight')
    this.setState({active: 'highlight'})
  }

  render() {
    return (
      <div className="toolbar">
        <button className={`cursor ${this.state.active === 'cursor' ? 'active' : ''}`} type="button" title="Cursor" onClick={this.cursorClick.bind(this)}>➚</button>

        <div className="spacer"></div>

        <button className={`highlight ${this.state.active === 'highlight' ? 'active' : ''}`} type="button" title="Highlight" onClick={this.highlightClick.bind(this)}>&nbsp;</button>
      </div>
    )
  }
}
