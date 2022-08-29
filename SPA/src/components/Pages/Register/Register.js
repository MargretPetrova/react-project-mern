import React, {
    useState, useEffect, useContext, useRef
} from "react";
import styles from './Register.module.css'
import {
    useNavigate
} from 'react-router-dom';
import {
    Link
} from 'react-router-dom'

import uniqid from 'uniqid'
import {
    register
} from "../../../services/authRequests";
import { AuthContext } from "../../../contexts/AuthContext";
import { NotificationContext } from "../../../contexts/NotificationContext";
import convertError from "../../../helpers/errorConverter";
import { registerInputValidation } from "../../../helpers/inputValidation";
import Input from "../../Forms/Input";
import { emailValidation, passwordValidation, namesValidation } from "../../../helpers/inputValidation";
import Form from '../../Forms/Form';
import Section from '../../Forms/Section';
import InfoDiv from '../../Forms/InfoDiv';
import Main from '../../Main/Main'
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



    return (
        <Main>
            <Section heading='Create your own account'>
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
                
                <InfoDiv 
                   heading='Already have an account ? '
                   to='/login' 
                   action='Sign in'/>

            </Section>
        </Main>


    )
}