import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import Viewer from './Viewer'
import Toolbar from './Toolbar'
import Comments from './Comments'

const PaperReview = ({ id, name }) => (
  <div className="cwrapper">
    <div className="content">
      <h2>{name} <Toolbar /></h2>
      <Viewer documentId={id} />
      <Comments />
    </div>
  </div>
)

PaperReview.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired
}

export default PaperReview
