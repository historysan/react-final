import React from 'react'
import UserInfo from './UserInfo'
import UserPost from './UserPost'
import withAuth from '../withAuth'

const Profile = ({ session }) => (
  <div className="App">
    <UserInfo session={session} />
    <UserPost author={session.getCurrentUser.firstName} />
  </div>
)

export default withAuth(session => session && session.getCurrentUser)(Profile)