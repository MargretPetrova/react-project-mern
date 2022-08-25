
import React, { useState, useEffect, useContext } from 'react';
import styles from '../Edit/Edit.module.css'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { editCenter, getCenter } from '../../services/postRequests';
 import uniqid from 'uniqid';
// import FormItems from '../items/FormItems'
import { isOwnerFunc } from '../../guards/authGuard';
import { AuthContext } from '../../contexts/AuthContext';
import { NotificationContext } from '../../contexts/NotificationContext';
import convertError from '../../helpers/errorConverter';
import { createInputValidation } from '../../helpers/inputValidation';
import Form from '../Forms/Form';
import Input from '../Items/Input'

function Edit() {
    useEffect(() => {
        document.title = 'Edit Page'
        getCenterById()
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

            addNotifications( convertError(err), types.error)
            console.error(err.message)
        }
    }

    async function onEditHandler(e) {
        e.preventDefault();
        console.log('onEditHandler');
      
        let formData = new FormData(e.currentTarget);
        let name = formData.get('name').trim();
        let location = formData.get('location').trim();
        let address = formData.get('address').trim();
        let phone = formData.get('phone').trim();
        let image = formData.get('image').trim();
        let description = formData.get('description').trim()

      
        
        try {
            
            if (!isOwnerFunc(center.ownerId, userInfo.user._id)) {
                throw new Error('Sorry, only the owner can edit this')
            }
      
        createInputValidation(name, location, address,phone,image, description)
        let data = { name, location, address, phone, image, description }
        
            await editCenter(data, centerId, userInfo.user.accessToken)
            setCenter(data);
            addNotifications('successfuly edited the center', types.success)
            navigate(`/catalog/${centerId}`)

        } catch (err) {
            addNotifications(convertError(err), types.error)
            console.error(err)
        }

    }

    return (
        <main className={styles.body}>

            <section id="create-page">

                <div className={styles.boxs}>
                    <div className={styles.image}>
                        <h2 className={styles.cardHeading}>Edit help center</h2>
                    </div>
                    <Form method="PUT" handler={onEditHandler} action='Edit center'>
                    <Input
                            key={uniqid()}
                            type='text'
                            text='Name'
                            placeholder='Bright future- west'
                            name='name'
                            value={center.name}
                        />

                        <Input
                            key={uniqid()}
                            text='Location'
                            placeholder='Sofia'
                            name='location'
                            value={center.location}
                        />


                        <Input
                            key={uniqid()}
                            type='text'
                            text='Address'
                            placeholder='Vitoshka 10'
                            name='address'
                            value={center.address}
                        />
                        <Input
                            key={uniqid()}
                            type='text'
                            text='Phone Number'
                            placeholder='0896 32 24 57'
                            name='phone'
                            value={center.phone}
                        />
                        <Input
                            key={uniqid()}
                            type='text'
                            text='Image'
                            placeholder='http://'
                            name='image'
                            value={center.image}
                        />
                        <Input
                            key={uniqid()}
                            type='text'
                            text='Description'
                            placeholder='Some description about the center here...'
                            name='description'
                            value={center.description}
                        />

                    </Form>
                    
                </div>
            </section>

        </main>
    )
}



export { Edit };
