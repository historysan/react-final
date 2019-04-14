import React, { Fragment } from 'react'
import { NavLink } from 'react-router-dom'
import SignOut from './Auth/SignOut';

const Navbar = ({ session }) => (
  <nav>
    {session && session.getCurrentUser ? <NavBarAuth session={session} /> : <NavbarUnAuth />}
  </nav>
)

const NavBarAuth = ({ session }) => (
  <Fragment>
    <ul>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="search">Search</NavLink>
      </li>
      <li>
        <NavLink to="post/add">Add Post</NavLink>
      </li>
      <li>
        <NavLink to="/profile">Profile</NavLink>
      </li>
      <li>
        <SignOut />
      </li>
    </ul>
    <h4>Welcome, <strong>{session.getCurrentUser.firstName}</strong></h4>
  </Fragment>
)

const NavbarUnAuth = () => (
  <ul>
    <li>
      <NavLink to="/" exact>Home</NavLink>
    </li>
    <li>
      <NavLink to="/search">Search</NavLink>
    </li>
    <li>
      <NavLink to="/sign-in">Sign In</NavLink>
    </li>
    <li>
      <NavLink to="/sign-up">Sign Up</NavLink>
    </li>
  </ul>
)

export default Navbar