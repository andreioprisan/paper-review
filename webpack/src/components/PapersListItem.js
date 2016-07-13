import React, { PropTypes } from 'react'
import { Link } from 'react-router'

export default function PapersListItem({ name, id }) {
  return (
    <ul className="lister">
      <li>
        <Link to={{ pathname: `/review/${id}` }}>{name}</Link>
      </li>
    </ul>
  )
}

PapersListItem.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired
}
