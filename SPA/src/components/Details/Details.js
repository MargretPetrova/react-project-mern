
import React, { useState, useEffect, useContext } from 'react';
import styles from '../Details/Details.module.css'
import { Link } from 'react-router-dom'
import { becomeVolunteer, deleteCenter, getCenter } from '../../services/postRequests';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { isOwnerFunc, isVolunteer } from '../../guards/authGuard';
import { NotificationContext } from '../../contexts/NotificationContext';
import convertError from '../../helpers/errorConverter';

export default function Details({ }) {

    useEffect(() => {
        document.title = 'Details Page'
        getCenterById();
    }, []);

    const navigate = useNavigate()
    const{addNotifications, types} = useContext(NotificationContext)

    const { pathname } = useLocation();
    const centerId = pathname.split('/')[2]

    const [center, setCenter] = useState([]);
    const {userInfo } = useContext(AuthContext);
    const [volunteers, setVolunteers] = useState();

   
    async function getCenterById() {
        
        try {
            const result = await getCenter(centerId);
            setCenter(result);
            let allVolunteers = result.volunteers.map(x=> {return`${ x.firstName} ${x.lastName}, `})
           setVolunteers(allVolunteers);
          
        } catch (err) {
            addNotifications( convertError(err) , types.error)
            console.error(err.message)
            navigate('/404')
        }
    }

    async function onDeleteHandler(e) {//not finished
        e.preventDefault();
        console.log('onDeleteHandler');
       

        
        try {
            if (!isOwnerFunc(center.ownerId, userInfo.user._id)) {
                throw new Error('Sorry, only the owner can delete this')
            }

            await deleteCenter(centerId, userInfo.user.accessToken);
            addNotifications('Successfully deleted', types.success)
            navigate('/catalog')

        } catch (err) {

            addNotifications(convertError(err), types.success)
            console.error(err.message)
        }

    }
    

    async function onBecomeVolunteerHandle(e) {
        e.preventDefault();
        console.log('onBecomeAVolunteerHandle');
       
        if (isOwnerFunc(center.ownerId, userInfo.user._id)) {
            throw new Error('Sorry, you cant become a volunteer')
        }
        if (!userInfo.user) {
            throw new Error('Sorry, only logged in users can become a volunteers')
        }
        try {
            const result = await becomeVolunteer(centerId, userInfo.user.accessToken);
            getCenterById();
            addNotifications('Successfully become a volunteer in this center', types.success)
            
        } catch (err) {
            addNotifications(err.message, types.success)
            console.error(err.message)
        }

    }
    

    let guestButtons = (
        <>
            {(userInfo.user && isVolunteer(center.volunteers, userInfo.user._id)) ? <button className={styles.alreadyVolunteer}>You are already a volunteer in this center</button>
                : <button className={styles.volunteer} onClick={onBecomeVolunteerHandle}>Become a volunteer</button>}

            <button className={styles.donate}><Link to={`/catalog/${centerId}/donate`}>Donate</Link></button>
        </>
    );
    let ownerButtons = (
        <>

            <button className={styles.edit}><Link to={`/catalog/${centerId}/edit`}>Edit</Link></button>
            <button className={styles.remove} onClick={onDeleteHandler}>Delete</button>
        </>
    )

    return (

        <main className={styles.body}>
            <section id="deatils-page">
                <div className={styles.wrapper}>
                    <div className={styles.img}>
                        <img src={center.image} />
                    </div>
                    <div className={styles.info}>
                        <div className={styles.text}>
                            <div className={styles.text}>
                                <h1> {center.name}</h1>
                                <h2>Location: {center.location}</h2>
                                <h4>Address: {center.address}</h4>
                                <h4>Phone Number: {center.phone}</h4>
                                <h5>Description:</h5>  <p>{center.description}</p>
                                <h5>Volunteers in this center:</h5> <p>{volunteers}</p>
                            </div>
                        </div>
                        <div className={styles.btn}>
                            {userInfo.user
                                ? (isOwnerFunc(center.ownerId, userInfo.user._id) ? ownerButtons : guestButtons)
                                : null}

                        </div>
                    </div>
                </div>
            </section>
        </main>


    )
}



