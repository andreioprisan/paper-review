import React, { PropTypes } from 'react'
import { Link } from 'react-router'

export default function PapersListItem({ name, id }) {
  return (
    <li>
      <Link to={{ pathname: `/review/${id}` }}>{name}</Link>
    </li>
  )
}

PapersListItem.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired
}
