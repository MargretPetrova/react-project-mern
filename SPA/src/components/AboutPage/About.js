import { useContext, useEffect } from "react";
import { Link } from 'react-router-dom'
import styles from '../AboutPage/About.module.css'
import { AuthContext } from "../../contexts/AuthContext";
export default function About() {
    useEffect(() => {
        document.title = 'About Page'
    }, [])
    

    return (
        <main>
            <section className={styles.backgroundImage}>
                <div className={styles.aboutContainer}>

                    <div className={styles.info}>
                        <h1>About this site</h1>

                        
                    </div>

                </div>
                
            </section>
            <div className={styles.paragraf}>
    <p>This site is for support for children and families of Ukraine.
                            There are many actions we can take as individuals to help Ukrainians in the country, those on the move and internally displaced, and those who have fled the country.
                            The first step anyone can take to help is to learn about the issue and continue to stay informed. In a digital age that gives us infinite access to information, we can also be vulnerable to disinformation, so make sure the sources you are looking into are verified and trusted.
                            A simple steps you can take to help  is by opening 
                            <Link to="/create" className={styles.links}> OWN HELP CENTER</Link>
                            , become a
                            <Link to="/catalog" className={styles.links}> VOLUNTEER </Link>
                            or
                            <Link to="/catalog" className={styles.links}> DONATING </Link>
                            in centers registered in our site.
                        </p>
                        </div>

           
        </main>
    )
}