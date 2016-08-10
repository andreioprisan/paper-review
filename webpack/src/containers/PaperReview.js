import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import PaperReviewComponent from 'components/PaperReview'

@connect(
  state => ({
    papers: state.papers,
    questions: state.questions
  }))
export default class PaperReview extends Component {
  static propTypes = {
    paperId: PropTypes.string.isRequired,
    papers: PropTypes.object.isRequired,
    questions: PropTypes.object.isRequired
  }

  render() {
    const {
      loading,
      detail
    } = this.props.papers

    return (
      <div>
        {loading && <div>Loading ...</div>}
        {!this.props.papers.error && !loading && detail && <PaperReviewComponent {...detail[this.props.paperId]} questions={this.props.questions.data} />}
        {!loading && this.props.papers.error && this.props.papers.error.detail}
      </div>
    )
  }
}
