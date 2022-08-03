import React, { useContext, useEffect, useState } from 'react';
import styles from '../Header/Header.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext';
import { logOut } from '../../services/authRequests';
import * as authService from '../../services/authService'

const Header = ({ }) => {
  const navigate = useNavigate();

  const { userInfo, isLoggedIn, isLoggedOut } = useContext(AuthContext)


  async function onLogoutHandler() {
    await logOut();
    isLoggedOut();
    navigate('/')

  }


  let guestNavigation = (
    <>
      <li><Link className={styles.links} to="/login">Login</Link></li>
      <li><Link className={styles.links} to="/register">Register</Link></li>
    </>
  );

  let userNavigation = (
    <>
      <li><Link  className={styles.links} to="/create">Create Help Center</Link></li>
      <li><Link  className={styles.links} to="/search">Search</Link></li>
      <li><Link className={styles.links} to="/" onClick={onLogoutHandler} >Logout</Link></li>
    </>
  );

  return (


    <nav >
      <Link  to="/about">About</Link>
      <Link  to="/">Home</Link>
      <ul>

        <li><Link  to="/catalog">Centers</Link></li>
        {userInfo && userInfo.user
          ? userNavigation
          : guestNavigation
        }
        {/* {userNavigation}
        {guestNavigation} */}



      </ul>
    </nav>

  )
}



export { Header };