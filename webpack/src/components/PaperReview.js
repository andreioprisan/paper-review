import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import Viewer from './Viewer'

const PaperReview = ({ id, name }) => (
  <div>
    <h2>{name}</h2>
    <Link to={{ pathname: '/' }}>Back to list</Link>
    <Viewer documentId={id} />
  </div>
)

PaperReview.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired
}

export default PaperReview
