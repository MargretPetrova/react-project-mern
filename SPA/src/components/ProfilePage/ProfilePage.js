import styles from '../ProfilePage/ProfilePage.module.css'
import {Link} from 'react-router-dom'
import { useContext, useEffect , useState} from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { getCurrentUser } from '../../services/authRequests';
import { NotificationContext } from '../../contexts/NotificationContext';



export default function ProfilePage(){
    const { userInfo } = useContext(AuthContext);

    const {addNotifications, types } = useContext(NotificationContext)

    const [userData, setUserData] = useState()

    async function getUserData(){
        try {
            const result = await getCurrentUser(userInfo.user.id);
            setUserData(result)
        } catch (err) {
            addNotifications(err.message, types.error)
            throw err.message
        }
        
    }

  useEffect(()=>{
getUserData();
  },[])

  

 
    
    return (
        <main className={styles.body}>
            <section id="profile">
                <div className={styles.wrapper}>
                    <div className={styles.img}>
                        {/* <img src=""/> */}
                        <h2>{userData?.firstName}</h2>
                    </div>
                    <div className={styles.info}>
                        <div className={styles.text}>
                            <div className={styles.text}>
                                <h2>Full Name:</h2><p> {userData?.firstName} {userData?.lastName} </p>
                                <h2>Email:</h2><p> {userData?.email}</p>
                                <h2>Owner Of:</h2>
                                {userData?.ownerOf.length
                                ? <p>{userData?.ownerOf.map(c => <Link to={`/catalog/${c._id}`} >{c.name}</Link>)}, </p> 
                                : null}
                                <h2>Volunteer in:</h2>
                                  {userData?.volunteerIn.length
                                ? <p>{userData?.volunteerIn.map(c => <Link to={`/catalog/${c._id}`} >{c.name}</Link>)}, </p> 
                                : null}
                            </div>
                        </div>
                        {/* <div className={styles.btn}>
                        <button className={styles.edit}>Edit your personal info</button>
                        </div> */}
                    </div>
                </div>
            </section>
        </main>
    )
}