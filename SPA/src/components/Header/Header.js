import React, { useContext, useEffect, useState } from 'react';
import styles from '../Header/Header.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext';
import { logOut } from '../../services/authRequests';
import * as authService from '../../services/authService';
import { useCookies } from 'react-cookie';
import { NotificationContext } from '../../contexts/NotificationContext';
import convertError from '../../helpers/errorConverter';

const Header = ({ }) => {
  const navigate = useNavigate();
  const { notifications, addNotifications, types } = useContext(NotificationContext)
  
  const { userInfo, isLoggedOut } = useContext(AuthContext)

  async function onLogoutHandler() {
    try {

      await logOut();
      isLoggedOut();
      addNotifications('You successfuly logout', types.success)
      navigate('/')

    } catch (err) {

      addNotifications(convertError(err), types.error);
      throw err.message

    }
  }



  let guestNavigation = (
    <>
      <li><Link className={styles.links} to="/login">Login</Link></li>
      <li><Link className={styles.links} to="/register">Register</Link></li>
    </>
  );

  let userNavigation = (
    <>
      <li><Link className={styles.links} to="/create">Create Help Center</Link></li>
      <li><Link className={styles.links} to="/profile">Profile {userInfo?.user ? `of ${userInfo?.user.email}` : null}</Link></li>
      <li><Link className={styles.links} to="/" onClick={onLogoutHandler} >Logout</Link></li>
    </>
  );

  return (


    <nav className={styles.navigation}>
      <Link to="/about">About</Link>
      <Link to="/">Home</Link>
      <ul>

        <li><Link to="/catalog">Centers</Link></li>

        {userInfo?.user
          ? userNavigation
          : guestNavigation
        }

      </ul>
    </nav>

  )
}



export { Header };