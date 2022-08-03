
import React, { useState, useEffect, useContext } from 'react';
import styles from '../Details/Details.module.css'
import { Link } from 'react-router-dom'
import { becomeVolunteer, deleteCenter, getCenter } from '../../services/postRequests';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { isOwnerFunc, isVolunteer } from '../../guards/authGuard';

export default function Details({ }) {

    useEffect(() => {
        document.title = 'Details Page'
    }, []);
    const navigate = useNavigate()

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
           setVolunteers(allVolunteers)
          
        } catch (err) {
            console.error(err.message)
            navigate('/404')
        }
    }

    useEffect(() => {
        getCenterById();
    }, [])



    async function onDeleteHandler(e) {//not finished
        e.preventDefault();
        console.log('onDeleteHandler');

        if (!isOwnerFunc(center.ownerId, userInfo.user.id)) {
            throw new Error('Sorry, only the owner can delete this')
        }
        try {
            await deleteCenter(centerId);
            navigate('/catalog')

        } catch (err) {
            console.error(err.message)
        }

    }
    

    async function onBecomeVolunteerHandle(e) {
        e.preventDefault();
        console.log('onBecomeAVolunteerHandle');
        console.log(isOwnerFunc(center.ownerId, userInfo.user.id))
        if (isOwnerFunc(center.ownerId, userInfo.user.id)) {
            throw new Error('Sorry, you cant become a volunteer')
        }
        if (!userInfo.user) {
            throw new Error('Sorry, only logged in users can become a volunteers')
        }
        try {
            const result = await becomeVolunteer(centerId, userInfo.user.id);
            getCenterById();
            
        } catch (err) {
            console.error(err.message)
        }

    }

    let guestButtons = (
        <>
            {(userInfo && isVolunteer(center.volunteers, userInfo.user.id)) ? <button className={styles.alreadyVolunteer}>You are already a volunteer in this center</button>
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
                            {userInfo
                                ? (isOwnerFunc(center.ownerId, userInfo.user.id) ? ownerButtons : guestButtons)
                                : null}

                        </div>
                    </div>
                </div>
            </section>
        </main>


    )
}



