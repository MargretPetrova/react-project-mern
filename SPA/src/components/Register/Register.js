import React, {
    useState, useEffect, useContext, useRef
} from "react";
import styles from '../Register/Register.module.css'
import {
    useNavigate
} from 'react-router-dom';
import {
    Link
} from 'react-router-dom'

import uniqid from 'uniqid'
import {
    register
} from "../../services/authRequests";
import { AuthContext } from "../../contexts/AuthContext";
import { NotificationContext } from "../../contexts/NotificationContext";
import convertError from "../../helpers/errorConverter";
import { registerInputValidation } from "../../helpers/inputValidation";
import Input from "../Items/Input";
import { emailValidation, passwordValidation, namesValidation } from "../../helpers/inputValidation";
import Form from '../Forms/Form'

export default function Register() {
    useEffect(() => {
        document.title = 'Register Page'
    }, [])

    const firstNameInputRef = useRef();
    const lastNameInputRef = useRef();
    const emailInputRef = useRef();
    // const passwordInputRef = useRef();
    // const rePassInputRef = useRef();

    const [emailValue, setEmailValue] = useState({ value: '', hasError: false, msg: '' });
    const [firstNameValue, setFirstNameValue] = useState({ value: '', hasError: false, msg: '' });
    const [lastNameValue, setLastNameValue] = useState({ value: '', hasError: false, msg: '' });

    

    const { isLoggedIn } = useContext(AuthContext)
    const { addNotifications, types } = useContext(NotificationContext)
    const navigate = useNavigate();


    async function onRegisterHandler(e) {
        e.preventDefault();
        let formData = new FormData(e.currentTarget);
        let firstName = formData.get('firstName').trim();
        let lastName = formData.get('lastName').trim();
        let email = formData.get('email').trim();
        let password = formData.get('password').trim();
        let rePassword = formData.get('rePassword').trim();

        setEmailValue({ value: email });
        setFirstNameValue({ value: firstName });
        setLastNameValue({ value: lastName });


        try {
            registerInputValidation(email, password, firstName, lastName, rePassword)

            const result = await register(firstName, lastName, email, password);
            isLoggedIn(result)
            addNotifications('Successfully registration', types.success)
            navigate('/')
        } catch (err) {
            addNotifications(convertError(err), types.error)
            throw err.message
        }
    }

    const validateFNameHandler = (e) => {
        e.preventDefault();

        if (namesValidation(e.target.value) === false) {
            setFirstNameValue({ value: e.target.value, hasError: true, msg: 'First Name must be at least 3 characters long' })
            setTimeout(() => { firstNameInputRef.current.focus() }, 300)

        } else {
            setFirstNameValue({ value: e.target.value, hasError: false, msg: '' })

        }
    }


    const validateLNameHandler = (e) => {
        e.preventDefault();
       
        if (namesValidation(e.target.value) === false) {
            setLastNameValue({ value: e.target.value, hasError: true, msg: 'Last Name must be at least 3 characters long' })
            setTimeout(() => { lastNameInputRef.current.focus() }, 300)

        } else {
            setLastNameValue({ value: e.target.value, hasError: false, msg: '' })

        }
    }


    function validateEmailHandler(e) {
        e.preventDefault();

        if (emailValidation(e.target.value) === false) {
            setEmailValue({ value: e.target.value, hasError: true, msg: 'Invalid email' })
            setTimeout(() => { emailInputRef.current.focus() }, 300)

        } else {
            setEmailValue({ value: e.target.value, hasError: false, msg: '' })

        }

    }

    // const validatePassHandler = (e) => {
    //     e.preventDefault();
    //     if (passwordValidation(e.target.value) === false) {
    //         // setErrors({target: 'pass',hasError:true, msg:'Pass must be at least 3 char long'})
    //     } else {
    //         // setErrors({target: '',hasError: false, msg: ''})

    //     }

    // }

    return (
        <main className={styles.body} >
            < section id="register-page" >
                <div className={styles.boxs} >
                    <div className={styles.image} >
                        <h2 className={styles.cardHeading} > Create your account </h2> </div>

                        <Form method="POST" handler={onRegisterHandler} action="Register">
                        <Input
                            ref={firstNameInputRef}
                            key={uniqid()}
                            text='First Name'
                            name='firstName'
                            placeholder='Magi'
                            value={firstNameValue.value}
                            onBlur={validateFNameHandler}
                            error={firstNameValue}
                        />
                        <Input
                            ref={lastNameInputRef}
                            key={uniqid()}
                            text='Last Name'
                            name='lastName'
                            placeholder='Ivanova'
                            value={lastNameValue.value}
                            onBlur={validateLNameHandler}
                            error={lastNameValue}
                        />
                        <Input
                            ref={emailInputRef}
                            key={uniqid()}
                            text='Email'
                            name='email'
                            placeholder='margi@abv.bg'
                            value={emailValue.value}
                            onBlur={validateEmailHandler}
                            error={emailValue}
                        />
                        <Input
                            //  ref={passwordInputRef}
                            key={uniqid()}
                            text='Password'
                            name='password'
                            placeholder='****'
                            // value={passValue}
                            type='password'
                        />
                        <Input
                            //  ref={rePassInputRef}
                            key={uniqid()}
                            text='Repeat Password'
                            name='rePassword'
                            placeholder='****'
                            // value={rePassValue}
                            type='password'
                        />
                        </Form>
              
                    <div className={styles.cardInfo} ><small > Already have an account ? <Link to="/login" > Sign in </Link> </small> </div> </div> </section>

        </main>


    )
}