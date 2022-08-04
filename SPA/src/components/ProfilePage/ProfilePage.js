import styles from '../ProfilePage/ProfilePage.module.css'
import {Link} from 'react-router-dom'
export default function ProfilePage(){
    let imageUrl = 'data:image/jpeg;base64,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'
    return (
        <main className={styles.body}>
            <section id="profile">
                <div className={styles.wrapper}>
                    <div className={styles.img}>
                        <img src={imageUrl} />
                        <h2>magi</h2>
                    </div>
                    <div className={styles.info}>
                        <div className={styles.text}>
                            <div className={styles.text}>
                                <h2>Full Name:</h2><p> Margret Ruseva </p>
                                <h2>Email:</h2><p> maggi@abv.bg</p>
                                <h2>Owner Of:</h2>
                                <p> <Link to="/catalog/{idOfThatCenter}" >Hope Center</Link>,  <Link to="/catalog/{idOfThatCenter}" >Hope Center</Link></p>
                                <h2>Volunteers in this center:</h2> <p>some centers</p>
                            </div>
                        </div>
                        <div className={styles.btn}>
                        <button className={styles.edit}>Edit your personal info</button>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}