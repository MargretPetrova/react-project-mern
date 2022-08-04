import React, { useState , useContext} from "react";
import styles from "./Login.module.css"
import { useNavigate } from 'react-router-dom';
import FormItems from '../items/FormItems'
import uniqid from 'uniqid';
import {Link} from 'react-router-dom'
import * as authService from '../../services/authService'
import { useEffect } from "react";
 import { logIn } from "../../services/authRequests";
import { AuthContext } from "../../contexts/AuthContext";
import ErrorContainer, { ErrorBoundary } from "../ErrorBoundary/ErrorBoundary";
import { NotificationContext } from "../../contexts/NotificationContext";


export default function Login() {

    useEffect(()=>{
document.title = 'Login Page';
    }, [])
    const navigate = useNavigate();
    const {isLoggedIn} = useContext(AuthContext);
    const{notifications, addNotifications, types} = useContext(NotificationContext)

    const [inputs, setInputs]= useState([
        {id: uniqid(),text: 'Email',name: 'email', placeholder: 'magi@abv.bg'},
        {id: uniqid(),text: 'Password', name: 'password' ,placeholder: '******'}
    ]);
    
async function onLoginHandler(e){
e.preventDefault();
let formData = new FormData(e.currentTarget);
let email = formData.get('email').trim();
let password = formData.get('password').trim();


try {
    if (email=='' || password=='') {
        throw new Error(`All fields are requred`)
    }
   
    await logIn(email, password);
        isLoggedIn();
        addNotifications('You successfuly login', types.success )
        navigate('/')
   
} catch (err) {
    addNotifications(err.message, types.error )
    throw err.message
    
}
}

   
    return (
        <main className={styles.body}>
            
        <section key="login-page" >
            
        
            <div className={styles.boxs}>
            <div className={styles.image}>
            <h2 className={styles.cardHeading} >Login</h2> 
            </div>
         
                <form className={styles.cardForm}  method="POST" onSubmit={onLoginHandler}>
{inputs.map(input=> <FormItems data={input} key={uniqid()}/>)}
                    
                    <div className={styles.action}>
                        <button className={styles.actionButton}>Login</button>
                    </div>
                </form>
                <div className={styles.cardInfo}>
                    <small>Dont have an account?<Link to="/register">Sign up</Link>
                    </small>
                </div>
            </div>
        </section>

    </main>
    )
};
;

