
import React, { useState, useEffect, useContext } from 'react';
import styles from '../Edit/Edit.module.css'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { editCenter, getCenter } from '../../services/postRequests';
// import uniqid from 'uniqid';
// import FormItems from '../items/FormItems'
import { isOwnerFunc } from '../../guards/authGuard';
import { AuthContext } from '../../contexts/AuthContext';
import { NotificationContext } from '../../contexts/NotificationContext';

function Edit() {
    useEffect(() => {
        document.title = 'Edit Page'
    }, [])
    const navigate = useNavigate()

    const { userInfo } = useContext(AuthContext);

    const{notifications, addNotifications, types} = useContext(NotificationContext)

    const { pathname } = useLocation();
    const centerId = pathname.split('/')[2]


    const [center, setCenter] = useState([]);

    async function getCenterById() {
        try {
            const result = await getCenter(centerId);
            setCenter(result)
        } catch (err) {
            addNotifications(err.message, types.error)
            console.error(err.message)
        }
    }

    useEffect(() => {
        getCenterById()
    }, [])


    async function onEditHandler(e) {
        e.preventDefault();
        console.log('onEditHandler');
        if (!isOwnerFunc(center.ownerId, userInfo.user.id)) {
            throw new Error('Sorry, only the owner can edit this')
        }
        let formData = new FormData(e.currentTarget);
        let name = formData.get('name').trim();
        let location = formData.get('location').trim();
        let address = formData.get('address').trim();
        let phone = formData.get('phone').trim();
        let image = formData.get('image').trim();
        let description = formData.get('description').trim()

        if (name == '' || location == '' || address == '' || description == '' || phone == '' || image == '') {
            throw new Error('All fields are required')
        }
        let data = { name, location, address, phone, image, description }
        
        try {
            await editCenter(data, centerId)
            setCenter(data);
            addNotifications('successfuly edited the center', types.success)
            navigate(`/catalog/${centerId}`)

        } catch (err) {
            addNotifications(err.message, types.error)
            console.error(err.message)
        }

    }

    return (
        <main className={styles.body}>

            <section id="create-page">

                <div className={styles.boxs}>
                    <div className={styles.image}>
                        <h2 className={styles.cardHeading}>Edit help center</h2>
                    </div>
                    <form className={styles.cardForm} onSubmit={onEditHandler}>
                        <div className={styles.input} >
                            <input type="text" className={styles.inputField} name="name" defaultValue={center.name} />
                            <label className={styles.name}>Name</label>
                        </div>
                        <div className={styles.input} >
                            <input type="text" className={styles.inputField} name="location" defaultValue={center.location} />
                            <label className={styles.name}>Location</label>
                        </div>
                        <div className={styles.input} >
                            <input type="text" className={styles.inputField} name="address" defaultValue={center.address} />
                            <label className={styles.name}>Address</label>
                        </div>
                        <div className={styles.input} >
                            <input type="text" className={styles.inputField} name="phone" defaultValue={center.phone} />
                            <label className={styles.name}>Phone Number</label>
                        </div>

                        <div className={styles.input} >
                            <input type="text" className={styles.inputField} name="image" defaultValue={center.image} />
                            <label className={styles.name}>Image</label>
                        </div>
                        <div className={styles.input} >
                            <input type="text" className={styles.inputField} name="description" defaultValue={center.description} />
                            <label className={styles.name}>Description</label>
                        </div>
                        {/* {inputs.map(input => <FormItems data={input} key={uniqid()}/>)} */}
                        <div className={styles.action}>
                            <button className={styles.actionButton}>Edit center</button>
                        </div>


                    </form>
                </div>
            </section>

        </main>
    )
}



export { Edit };
