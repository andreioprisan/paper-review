import React, { Component, PropTypes } from 'react'
import Question from './Question'
import styles from './questions.css'

export default class Questions extends Component {

  render() {
    return (
      <div>
        <h3>Questions</h3>
        {this.props.questions.map((q, key) => <Question key={key} {...q} />)}
        <button className="button blue">Submit review</button>
      </div>
    )
  }
}

Questions.propTypes = {
  questions: PropTypes.array.isRequired
}
