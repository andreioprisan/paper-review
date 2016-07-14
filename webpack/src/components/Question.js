import React, { Component, PropTypes } from 'react'
import Slider from 'react-rangeslider'
import styles from './questions.css'

const RATING_QUESTION_TYPE = 'rating'

export default class Question extends Component {

  componentDidMount() {
    const { id, onChange, question_type } = this.props
    if(question_type === RATING_QUESTION_TYPE) { // We need to inialize value for Slider field
      onChange(id, 1)
    }
  }

  render() {
    const { id, text, question_type, steps, onChange, value } = this.props

    let input
    if(question_type === RATING_QUESTION_TYPE) {
      input = <Slider min={1} max={steps} value={value} onChange={(value) => onChange(id, value)} />
    } else {
      input = <textarea required value={value} onChange={(e) => onChange(id, e.target.value)}></textarea>
    }

    return (
      <div className={styles.question}>
        <h5 className={styles.text}>{text}</h5>
        <div className={styles.answer}>{input}</div>
      </div>
    )
  }
}

Question.propTypes = {
  id: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  question_type: PropTypes.string.isRequired,
  steps: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.any
}
