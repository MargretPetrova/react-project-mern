import React, { useState, useContext, useRef } from "react";
import styles from "./Login.module.css"
import { useNavigate } from 'react-router-dom';
import Input from '../../Forms/Input'
// import FormItems from '../Items/FormItems'
import uniqid from 'uniqid';
import { Link } from 'react-router-dom'
// import * as authService from '../../services/authService'
import { useEffect } from "react";
import { logIn } from "../../../services/authRequests";
import { AuthContext } from "../../../contexts/AuthContext";
// import ErrorContainer, { ErrorBoundary } from "../ErrorBoundary/ErrorBoundary";
import { NotificationContext } from "../../../contexts/NotificationContext";
// import {useCookies} from 'react-cookie';
import convertError from "../../../helpers/errorConverter";
import { emailValidation, loginInputValidation, passwordValidation } from "../../../helpers/inputValidation";
import Form from '../../Forms/Form';
import Section from '../../Forms/Section';
import InfoDiv from '../../Forms/InfoDiv';
import Main from '../../Main/Main'

export default function Login() {

    useEffect(() => {
        document.title = 'Login Page';
    }, [])

    const navigate = useNavigate();
    const { isLoggedIn } = useContext(AuthContext);
    const { addNotifications, types } = useContext(NotificationContext);

    const [emailValue, setEmailValue] = useState();


    const emailInputRef = useRef();
    const passwordInputRef = useRef();

    async function onLoginHandler(e) {
        e.preventDefault();
        let formData = new FormData(e.currentTarget);
        let email = formData.get('email').trim();
        let password = formData.get('password').trim();
        setEmailValue(email)
        try {

            loginInputValidation(email, password)

            const result = await logIn(email, password);

            isLoggedIn(result);
            addNotifications('You successfuly login', types.success)
            navigate('/')

        } catch (err) {

            addNotifications(convertError(err), types.error)
            formData.set('email', email)
            throw err.message

        }

    }

    function validateEmailHandler(e) {
        e.preventDefault();

        if (emailValidation(e.target.value) === false) {
            emailInputRef.current.focus();

            e.target.style.borderColor = 'red';
        } else {
            e.target.style.borderColor = '';
        }
    }

    const validatePassHandler = (e) => {
        e.preventDefault();
        if (passwordValidation(e.target.value) === false) {

            passwordInputRef.current.focus();
            e.target.style.borderColor = 'red';
        } else {
            e.target.style.borderColor = ''
        }

    }

    return (
        <Main>
<Section heading='Login'>
                    <Form method="POST" handler={onLoginHandler} action="Login">
                        <Input
                            ref={emailInputRef}
                            key={uniqid()}
                            text='Email'
                            name='email'
                            placeholder='margi@abv.bg'
                            value={emailValue}

                            onBlur={validateEmailHandler}

                        />
                        <Input
                            ref={passwordInputRef}
                            key={uniqid()}
                            text='Password'
                            name='password'
                            placeholder='*********'
                            value=''
                            type='password'

                            onBlur={validatePassHandler}
                        />

                    </Form>

                   <InfoDiv 
                   heading='Dont have an account? '
                   to='/register' 
                   action='Sign up'/>

                    </Section>
           

                    </Main>
    )
};
;