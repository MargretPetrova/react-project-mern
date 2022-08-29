import React, { useContext} from 'react';
import styles from '../Header/Header.module.css'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext';


const Header = (props) => {
   const { userInfo } = useContext(AuthContext)

  

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
      <li><Link className={styles.links} to="/" onClick={props.onShowModal} >Logout</Link></li>
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