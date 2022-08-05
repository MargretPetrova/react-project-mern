import styles from '../Catalog/Catalog.module.css'
import CardItems from '../items/CardItems'
import uniqid from 'uniqid';
import { useEffect, useState } from 'react';
import { getAllCenters } from '../../services/postRequests';
export default function Catalog() {
    useEffect(() => {
        document.title = 'Catalog Page'
    }, [])
    let [centers, setCenters] = useState([])

    async function getData() {

        try {
            const result = await getAllCenters();

            setCenters(result);
        } catch (err) {
            console.error(err)
        }
    }
    useEffect(() => {
        getData();
    }, [])
    

    return (
        <main className={styles.body}>

            <div className={styles.aboutContainer}> 
            </div>
            <h1>All centers registered in our site</h1>
            <section  className={styles.listing}>


                <div className={styles.centers}>
                    {centers.length ?
                        centers.map(center => <CardItems data={center} key={uniqid()} />)
                        : (<div className={styles.noData}>
                            <p >There has no centers registerd yet...</p>
                        </div>)
                    }
                   
                </div>
            </section>
        </main>
    )
}