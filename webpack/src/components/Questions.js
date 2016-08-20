import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Question from './Question'
import styles from './questions.css'
import { change, submit } from 'redux/modules/reviews'
import { browserHistory } from 'react-router'

@connect(
  state => ({
    reviews: state.reviews
  }),
  dispatch => ({
    change(paperId, questionId, value) {
      dispatch(change(paperId, questionId, value))
    },
    submit(paperId, answers) {
      dispatch(submit(paperId, answers))
    }
  })
)
export default class Questions extends Component {

  componentWillReceiveProps(nextProps) {
    if (nextProps.reviews.submitted)
      browserHistory.push('/')
  }

  onChange(questionId, value) {
    this.props.change(this.props.paperId, questionId, value)
  }

  paperData(reviews, paperId) {
    return reviews.data[paperId] || { }
  }

  onSubmit(e) {
    e.preventDefault()

    const { reviews, paperId, submit } = this.props
    const paperData = this.paperData(reviews, paperId)
    submit(paperId, paperData)
  }

  render() {
    const { questions, reviews, paperId } = this.props
    const paperData = this.paperData(reviews, paperId)

    return (
      <div>
        <h3>Questions</h3>
        <form onSubmit={this.onSubmit.bind(this)}>
          {questions.map((q, key) => <Question key={key} value={paperData[q.id]} onChange={this.onChange.bind(this)} {...q} />)}
          <button className="button blue" type="submit">Submit review</button>
          <h3>{!reviews.submitting && this.props.reviews.error && this.props.reviews.error.message}</h3>
        </form>
      </div>
    )
  }
}

Questions.propTypes = {
  paperId: PropTypes.number.isRequired,
  questions: PropTypes.array.isRequired,
  change: PropTypes.func,
  submit: PropTypes.func,
  reviews: PropTypes.object
}
