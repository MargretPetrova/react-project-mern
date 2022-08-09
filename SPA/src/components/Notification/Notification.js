import { useContext } from 'react'
import { NotificationContext } from '../../contexts/NotificationContext'
import styles from '../Notification/Notification.module.css'


export default function Notification() {
    const { notifications, types } = useContext(NotificationContext)

    let errorBoolean = false;
    
    if(notifications.type == 'Error'){
        errorBoolean = true;
    }
   

    const divNotify = (
        <div className={errorBoolean ? styles.errorss : styles.errorContainer}>
            <p>{notifications.type} : {notifications.message}</p>
        </div>

    )

    return <>
        {notifications.show ? divNotify : null}
    </>


}
