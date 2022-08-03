import React, {
    useState, useEffect, useContext
} from "react";
import styles from '../Register/Register.module.css'
import {
    useNavigate
} from 'react-router-dom';
import {
    Link
} from 'react-router-dom'
import FormItems from '../items/FormItems'
import uniqid from 'uniqid'
import {
    register
} from "../../services/authRequests";
import { AuthContext } from "../../contexts/AuthContext";
import { NotificationContext } from "../../contexts/NotificationContext";

export default function Register() {
    useEffect(()=>{
        document.title = 'Register Page'
            }, [])
    const [inputs, setInputs] = useState([{id: uniqid(),text: 'First Name',name: 'firstName',placeholder: 'Margret' },
    {id: uniqid(),text: 'Last Name',name: 'lastName',placeholder: 'Ivanova'},
    {id: uniqid(),text: 'Email',name: 'email',placeholder: 'magi@abv.bg'},
    {id: uniqid(),text: 'Password',name: 'password',placeholder: '******'},
    {id: uniqid(),text: 'Repeat Password',name: 'rePassword',placeholder: '******'}


    ])
    const {isLoggedIn} = useContext(AuthContext)
    const {addNotifications, types} = useContext(NotificationContext)
    const navigate = useNavigate();
    async function onRegisterHandler(e) {
        e.preventDefault();
        let formData = new FormData(e.currentTarget);
        let firstName = formData.get('firstName').trim();
        let lastName = formData.get('lastName').trim();
        let email = formData.get('email').trim();
        let password = formData.get('password').trim();
        let rePassword = formData.get('rePassword').trim()

        try {
            if (email == '' || password == '' || firstName == '' || lastName == '' || rePassword == "") {
                throw new Error(`All fields are requred`)
            }
            if (password != rePassword) {
                throw new Error(`Enter correct password`)

            }
            await register(firstName, lastName, email, password);
            isLoggedIn()
            addNotifications('Successfully registration', types.success)
            navigate('/')
        } catch (err) {
            addNotifications(err.message, types.error)
            throw err.message
        }
    }
    return (
        <main className={styles.body} >
            < section id="register-page" >
                <div className={styles.boxs} >
                    <div className={styles.image} >
                        <h2 className={styles.cardHeading} > Create your account </h2> </div>
                    <form className={styles.cardForm} method="POST" onSubmit={onRegisterHandler}>
                        {inputs.map(input => <FormItems key={uniqid()} data={input} />)}
                        <div className={styles.action} >
                            <button className={styles.actionButton} > Get started </button> </div>
                    </form>

                    <div className={styles.cardInfo} ><small > Already have an account ? <Link to="/login" > Sign in </Link> </small> </div> </div> </section>

        </main>


    )
}