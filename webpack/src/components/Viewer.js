import React, { Component, PropTypes } from 'react'
import PDFJSAnnotate from 'lib/pdf-annotate'
import ApiStoreAdapter from 'helpers/ApiStoreAdapter'
import debounce from 'helpers/debounce'
import styles from './viewer.css'

const { UI } = PDFJSAnnotate
let PAGE_HEIGHT
let RENDER_OPTIONS = {
  pdfDocument: null,
  scale: 1.33,
  rotate: 0
}

PDFJSAnnotate.StoreAdapter = ApiStoreAdapter
PDFJS.workerSrc = '/pdfviewer/pdf.worker.js'

const debouncedRender = debounce((visiblePageNum) => UI.renderPage(visiblePageNum, RENDER_OPTIONS), 300)

export default class Viewer extends Component {

  componentDidMount() {
    RENDER_OPTIONS.documentId = this.props.documentId
    PDFJS.getDocument(`/papers/${this.props.documentId}`).then((pdf) => {
      RENDER_OPTIONS.pdfDocument = pdf

      let NUM_PAGES = pdf.pdfInfo.numPages
      for (let i=0; i<NUM_PAGES; i++) {
        let page = UI.createPage(i+1)
        this.refs.viewer.appendChild(page)
      }

      UI.renderPage(1, RENDER_OPTIONS).then(([pdfPage, annotations]) => {
        let viewport = pdfPage.getViewport(RENDER_OPTIONS.scale, RENDER_OPTIONS.rotate)
        PAGE_HEIGHT = viewport.height
      })
    })
  }

  onScroll(e) {
    let visiblePageNum = Math.round(e.target.scrollTop / PAGE_HEIGHT) + 1
    let visiblePage = document.querySelector(`.page[data-page-number="${visiblePageNum}"][data-loaded="false"]`)
    if (visiblePage) {
      debouncedRender(visiblePageNum)
    }
  }

  render() {
    return (
      <div>
        <div className={styles.wrapper} onScroll={this.onScroll}>
          <div ref="viewer" className="pdfViewer"></div>
        </div>
        <link rel="stylesheet" type="text/css" href="/pdfviewer/pdf_viewer.css"/>
      </div>
    )
  }
}

Viewer.propTypes = {
  documentId: PropTypes.number.isRequired
}
