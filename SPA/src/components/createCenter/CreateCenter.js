import React, { useState, useEffect, useContext } from "react";

import uniqid from 'uniqid';
import styles from './CreateCenter.module.css'
import { createCenter } from "../../services/postRequests";
import { useNavigate, Navigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { NotificationContext } from "../../contexts/NotificationContext";
import convertError from "../../helpers/errorConverter";
import { createInputValidation } from "../../helpers/inputValidation";
import Form from '../Forms/Form';
import Input from '../Items/Input'

export default function CreateCenter() {
    useEffect(() => {
        document.title = 'Create Page'
    }, [])

    const navigate = useNavigate();

    const { userInfo } = useContext(AuthContext)
    const { addNotifications, types } = useContext(NotificationContext);

    const [nameValue, setNameValue] = useState({ value: '', hasError: false, msg: '' });
    const [locationValue, setLocationValue] = useState({ value: '', hasError: false, msg: '' });
    const [addressValue, setAddressValue] = useState({ value: '', hasError: false, msg: '' });
    const [phoneValue, setPhoneValue] = useState({ value: '', hasError: false, msg: '' });
    const [imageValue, setImageValue] = useState({ value: '', hasError: false, msg: '' });
    const [descrValue, setDescrValue] = useState({ value: '', hasError: false, msg: '' });

    async function onCreateHandler(e) {
        e.preventDefault();

        let formData = new FormData(e.currentTarget);
        let name = formData.get('name').trim();
        let location = formData.get('location').trim();
        let address = formData.get('address').trim();
        let phone = formData.get('phone').trim();
        let image = formData.get('image').trim();
        let description = formData.get('description').trim()

        setDescrValue({value:description, hasError: false, msg: ''});
        setImageValue({value:image, hasError: false, msg: ''})
        setPhoneValue({value:phone, hasError: false, msg: ''});
        setAddressValue({value:address, hasError: false, msg: ''})
        setNameValue({value:name, hasError: false, msg: ''})
        setLocationValue({value:location, hasError: false, msg: ''})

        try {
            createInputValidation(name, location, address, phone, image, description)

            await createCenter({ name, location, address, phone, image, description }, userInfo.user.accessToken)
            addNotifications('Successfully registered center', types.success)
            navigate('/catalog')

        } catch (err) {

            addNotifications(convertError(err), types.error)
            console.error(err.message)
        }

    }

    return (

        <main className={styles.body}>

            <section id="create-page">

                <div className={styles.boxs}>
                    <div className={styles.image}>
                        <h2 className={styles.cardHeading}>Open help center</h2>
                    </div>
                    <Form method="POST" handler={onCreateHandler} action="Register Center">
                        <Input
                            key={uniqid()}
                            type='text'
                            text='Name'
                            placeholder='Bright future- west'
                            name='name'
                            value={nameValue.value}
                        />

                        <Input
                            key={uniqid()}
                            text='Location'
                            placeholder='Sofia'
                            name='location'
                            value={locationValue.value}
                        />


                        <Input
                            key={uniqid()}
                            type='text'
                            text='Address'
                            placeholder='Vitoshka 10'
                            name='address'
                            value={addressValue.value}
                        />
                        <Input
                            key={uniqid()}
                            type='text'
                            text='Phone Number'
                            placeholder='0896 32 24 57'
                            name='phone'
                            value={phoneValue.value}
                        />
                        <Input
                            key={uniqid()}
                            type='text'
                            text='Image'
                            placeholder='http://'
                            name='image'
                            value={imageValue.value}
                        />
                        <Input
                            key={uniqid()}
                            type='text'
                            text='Description'
                            placeholder='Some description about the center here...'
                            name='description'
                            value={descrValue.value}
                        />

                    </Form>

                </div>
            </section>

        </main>

    )
}