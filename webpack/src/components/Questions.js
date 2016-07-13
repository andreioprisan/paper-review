import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Question from './Question'
import styles from './questions.css'
import { change } from 'redux/modules/reviews'

@connect(
  state => ({
    reviews: state.reviews
  }),
  dispatch => ({
    change(paperId, questionId, value) {
      dispatch(change(paperId, questionId, value))
    }
  })
)
export default class Questions extends Component {

  onChange(questionId, value) {
    this.props.change(this.props.paperId, questionId, value)
  }

  render() {
    const { reviews, paperId } = this.props
    const paperData = reviews.data[paperId] || { }
    return (
      <div>
        <h3>Questions</h3>
        <form>
          {this.props.questions.map((q, key) => <Question key={key} value={paperData[q.id]} onChange={this.onChange.bind(this)} {...q} />)}
          <button className="button blue" type="submit">Submit review</button>
        </form>
      </div>
    )
  }
}

Questions.propTypes = {
  paperId: PropTypes.number.isRequired,
  questions: PropTypes.array.isRequired,
  change: PropTypes.func,
  reviews: PropTypes.object
}
