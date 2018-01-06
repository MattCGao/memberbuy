import React from 'react'
import { IndexLink, Link } from 'react-router'
import classes from './Header.scss'

export const Header = () => (
  <div>
    <h1>Memberbuy Frontend Interview</h1>
    <IndexLink to='/' activeClassName={classes.activeRoute}>
      Home
    </IndexLink>
    {' · '}
    <Link to='/notification' activeClassName={classes.activeRoute}>
      Answer
    </Link>
  </div>
)

export default Header
