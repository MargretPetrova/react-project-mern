import styles from '../ProfilePage/ProfilePage.module.css'
import {Link} from 'react-router-dom'
import { useContext, useEffect , useState} from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { getCurrentUser } from '../../services/authRequests';
import { NotificationContext } from '../../contexts/NotificationContext';
import convertError from '../../helpers/errorConverter';



export default function ProfilePage(){

    const { userInfo } = useContext(AuthContext);
    const {addNotifications, types } = useContext(NotificationContext)
    const [userData, setUserData] = useState()

    useEffect(()=>{
        getUserData();
          },[])

    async function getUserData(){
        try {
            const result = await getCurrentUser(userInfo.user.accessToken);
            setUserData(result)
        } catch (err) {
            addNotifications(convertError(err), types.error)
            throw err.message
        }
        
    }

  
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
                                ? <p>{userData?.ownerOf.map(c => <Link  key={c._id} to={`/catalog/${c._id}`} >{c.name}</Link>)}, </p> 
                                : <p>You dont have own help center yet but if you want <Link to={`/create`} >click here</Link>.</p>}
                                <h2>Volunteer in:</h2>
                                  {userData?.volunteerIn.length
                                ? <p>{userData?.volunteerIn.map(c => <Link  key={c._id} to={`/catalog/${c._id}`} >{c.name}</Link>)}, </p> 
                                : <p>You are not a volunteer in any help center yet.</p>}
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