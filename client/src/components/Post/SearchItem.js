import React from 'react'
import { Link } from 'react-router-dom'

const SearchItem = ({ _id, title, description }) => (
  <li>
    <Link to={`/post/${_id}`}>
      <h4>{title}</h4>
    </Link>
    <p>Description: {description}</p>
  </li>
)

export default SearchItem
