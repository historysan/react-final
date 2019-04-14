import React from 'react'
import { Link } from 'react-router-dom'

const PostItem = ({ _id, title, description }) => (
  <li>
    <Link to={`/post/${_id}`}>
      <h4>
        {title}
      </h4>
    </Link>
    <p>
      <strong>
        {description}
      </strong>
    </p>
  </li>
)

export default PostItem