import { useContext, useEffect } from "react";
import { Link } from 'react-router-dom'
import styles from './About.module.css'
import { AuthContext } from "../../../contexts/AuthContext";
import {aboutText} from '../../../helpers/texts'
export default function About() {
    useEffect(() => {
        document.title = 'About Page'
    }, [])
    

    return (
        <main className={styles.body}>
            <section className={styles.backgroundImage}>
                <div className={styles.aboutContainer}>

                    <div className={styles.info}>
                        <h1>About this site</h1>
                    </div>
                </div>
            </section>
            <div className={styles.paragraf}>
                {aboutText.map(text=><p>{text.p}</p>)}
                        </div>

           
        </main>
    )
}