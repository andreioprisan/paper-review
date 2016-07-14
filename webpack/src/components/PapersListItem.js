import React, { PropTypes } from 'react'
import { Link } from 'react-router'

export default function PapersListItem({ id, name, finished, user_reviewed }) {

  const link = !(finished || user_reviewed)

  let message = 'Waiting for reviews'
  if(finished) {
    message = 'Finished!'
  } else if(user_reviewed) {
    message = 'You already reviewed this paper'
  }

  return (
    <ul className="lister finished">
      <li>
        {link ? <Link to={{ pathname: `/review/${id}` }}>{name}</Link> : name}
      </li>
      <li>
        {message}
      </li>
    </ul>
  )
}

PapersListItem.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  finished: PropTypes.bool.isRequired,
  user_reviewed: PropTypes.bool.isRequired
}
