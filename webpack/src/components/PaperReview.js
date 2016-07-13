import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import Viewer from './Viewer'
import Toolbar from './Toolbar'
import Comments from './Comments'
import Questions from './Questions'

const PaperReview = ({ id, name, questions }) => (
  <div className="cwrapper">
    <div className="content">
      <h2>{name} <Toolbar /></h2>
      <Viewer documentId={id} />
      <Comments />
      <Questions questions={questions} />
    </div>
  </div>
)

PaperReview.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  questions: PropTypes.array.isRequired
}

export default PaperReview
