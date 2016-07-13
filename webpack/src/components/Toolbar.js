import React, { Component } from 'react'
import styles from './toolbar.css'

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
      <div className={styles.toolbar}>
        <button className={this.state.active === 'cursor' ? styles.active : ''} type="button" title="Cursor" onClick={this.cursorClick.bind(this)}>➚</button>
        &nbsp;
        <button className={`${styles.highlight} ${this.state.active === 'highlight' ? styles.active : ''}`} type="button" title="Highlight" onClick={this.highlightClick.bind(this)}>&nbsp;</button>
      </div>
    )
  }
}
