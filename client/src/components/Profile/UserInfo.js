import React from 'react'

const formatDate = date => {
  const newDate = new Date(date).toLocaleDateString('ka-GE')
  const newTime = new Date(date).toLocaleTimeString('ka-GE')
  return `${newDate} at ${newTime}`
}

const UserInfo = ({ session }) => (
  <div>
    <h3>User Info</h3>
    <p>Full Name: {session.getCurrentUser.firstName} {session.getCurrentUser.lastName}</p>
    <p>Email: {session.getCurrentUser.email}</p>
    <p>Join Date: {formatDate(session.getCurrentUser.created)}</p>
  </div>
)

export default UserInfo
