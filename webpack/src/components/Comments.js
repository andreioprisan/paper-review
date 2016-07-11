import React, { Component } from 'react'

import PDFJSAnnotate from 'lib/pdf-annotate'
const { UI } = PDFJSAnnotate

function supportsComments(target) {
  let type = target.getAttribute('data-pdf-annotate-type')
  return ['point', 'highlight', 'area'].indexOf(type) > -1
}

export default class Comments extends Component {
  constructor(props) {
    super(props)
    this.state = {
      comments: []
    }
    this.handleAnnotationClick = this.handleAnnotationClick.bind(this)
    this.handleAnnotationBlur = this.handleAnnotationBlur.bind(this)
  }

  handleAnnotationClick(target) {
    if (supportsComments(target)) {
      let documentId = target.parentNode.getAttribute('data-pdf-annotate-document')
      let annotationId = target.getAttribute('data-pdf-annotate-id')

      PDFJSAnnotate.StoreAdapter.getComments(documentId, annotationId).then((comments) => {
        this.setState({
          comments,
          documentId,
          annotationId
        })
        this.refs.content.focus()
      })
    }
  }

  handleAnnotationBlur() {
    this.setState({
      comments: [],
      documentId: undefined,
      annotationId: undefined
    })
  }

  onSubmit(e) {
    const { documentId, annotationId } = this.state
    PDFJSAnnotate.StoreAdapter.addComment(documentId, annotationId, this.refs.content.value.trim())
      .then((comment) => {
        this.setState({ comments: this.state.comments.concat([comment]) })
        this.refs.content.value = ''
        this.refs.content.focus()
      })

    e.preventDefault()
  }

  componentDidMount() {
    UI.addEventListener('annotation:click', this.handleAnnotationClick)
    UI.addEventListener('annotation:blur', this.handleAnnotationBlur)
  }

  componentWillUnmount() {
    UI.removeEventListener('annotation:click', this.handleAnnotationClick)
    UI.removeEventListener('annotation:blur', this.handleAnnotationBlur)
  }

  render() {
    const { comments, annotationId } = this.state

    let commentList
    if(comments.length) {
      commentList = this.state.comments.map((c, i) => <div key={i} className="comment-list-item">{c.content}</div>)
    } else {
      commentList = <div className="comment-list-item">No comments</div>
    }

    let form
    if(annotationId) {
      form = <form className="comment-list-form" onSubmit={this.onSubmit.bind(this)}>
              <input type="text" ref="content" placeholder="Add a Comment" />
            </form>
    }

    return (
      <div id="comment-wrapper">
        <h4>Comments</h4>
        <div className="comment-list">
          <div className="comment-list-container">
            {commentList}
          </div>
          {form}
        </div>
      </div>
    )
  }
}
