import React, { Component, PropTypes } from 'react'
import Slider from 'react-rangeslider'
import styles from './questions.css'

export default class Question extends Component {

  render() {
    const { text, question_type, steps } = this.props

    let input
    if(question_type === 'rating') {
      input = <Slider min={1} max={steps} value={1} onChange={() => true} />
    } else {
      input = <textarea required></textarea>
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
  text: PropTypes.string.isRequired,
  question_type: PropTypes.string.isRequired,
  steps: PropTypes.number
}
