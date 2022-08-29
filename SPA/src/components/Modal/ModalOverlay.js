
import styles from '../Modal/ModalOverlay.module.css'
import { useNavigate } from 'react-router-dom';
import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { NotificationContext } from '../../contexts/NotificationContext';
import convertError from '../../helpers/errorConverter';
import { logOut } from '../../services/authRequests';

const ModalOvarlay =(props)=>{

    const navigate = useNavigate();
  const { notifications, addNotifications, types } = useContext(NotificationContext)

  const { userInfo, isLoggedOut } = useContext(AuthContext)

  async function onLogoutHandler() {
    try {

      await logOut();
      isLoggedOut();
      addNotifications('You successfuly logout', types.success)
      props.onClick()
      navigate('/')

    } catch (err) {

      addNotifications(convertError(err), types.error);
      throw err.message

    }
  }


   return <div className={styles.modal}>
    <span className={styles.span}>Are you sure you want to logout as {userInfo.user.email}? </span>
    <div className={styles.actions}>
        <button className={styles['button--alt']} onClick={props.onClick} >
          No
        </button>
        <button className={styles.button} onClick={onLogoutHandler}>Yes</button>
      </div>
      {/* <div className={styles.content}>{props.children}</div> */}
    </div>
}
export default ModalOvarlay;