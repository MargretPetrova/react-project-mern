import React, { useState, useEffect, useContext } from "react";
import FormItems from '../items/FormItems'
import uniqid from 'uniqid';
import styles from '../createCenter/CreateCenter.module.css'
import { createCenter } from "../../services/postRequests";
import { useNavigate , Navigate} from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { NotificationContext } from "../../contexts/NotificationContext";


export default function CreateCenter() {
    const navigate = useNavigate();

    const{ addNotifications, types} = useContext(NotificationContext)

   
    useEffect(()=>{
        document.title = 'Create Page'
            }, []) 
            
    const [inputs, setInputs] = useState([
        { id: uniqid(), text: 'Name', placeholder: 'Bright future- west', name: 'name' },
        { id: uniqid(), text: 'Location', placeholder: 'Sofia', name: 'location' },
        { id: uniqid(), text: 'Address', placeholder: 'Vitoshka 10', name: 'address' },
       
        { id: uniqid(), text: 'Phone Number', placeholder: '+359 88 256 3421', name: 'phone' },
        { id: uniqid(), text: 'Image', placeholder: 'http://', name: 'image' },//Needed Volunteers
        // { id: uniqid(), text: 'Needed Volunteers', placeholder: '2', name: 'neededVolunteers' },
        { id: uniqid(), text: 'Description', placeholder: 'Some description about the center here...', name: 'description' }


    ])
   
    async function onCreateHandler(e){
        e.preventDefault();

        let formData = new FormData(e.currentTarget);
        let name = formData.get('name').trim();
        let location = formData.get('location').trim();
        let address = formData.get('address').trim();
        let phone = formData.get('phone').trim();
        let image = formData.get('image').trim();
        let description = formData.get('description').trim()

        console.log(name, location, address, image, phone, description)
        if (name=='' || location==''|| address=='' || description=='' || phone==''|| image=='' ) {
            throw new Error('All fields are required') 
         }

        try {
            await createCenter({name, location, address, phone, image, description})
            addNotifications('Successfully registered center', types.success)
            navigate('/catalog')
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
                <h2 className={styles.cardHeading}>Open help center</h2>
                    </div>
                    <form className={styles.cardForm}  method="POST" onSubmit={onCreateHandler}>
                        {inputs.map(input => <FormItems data={input} key={uniqid()}/>)}

                       
                        <div className={styles.action}>
                            <button className={styles.actionButton}>Register center</button>
                        </div>


                    </form>
                </div>
            </section>

        </main>

    )
}