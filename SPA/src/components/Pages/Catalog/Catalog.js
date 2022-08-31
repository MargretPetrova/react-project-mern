import styles from './Catalog.module.css'
import CardItems from '../../Items/CardItems'
import uniqid from 'uniqid';
import { useEffect, useState , useContext} from 'react';
import { getAllCenters } from '../../../services/postRequests';
import { NotificationContext } from '../../../contexts/NotificationContext';
import convertError from '../../../helpers/errorConverter';

export default function Catalog() {
 const [isLoading, setIsloading] = useState(false)
    useEffect(() => {
        document.title = 'Catalog Page';
        getData();
    }, [])

    let [centers, setCenters] = useState([]);
    const {addNotifications, types} = useContext(NotificationContext)

    async function getData() {
setIsloading(true)
        try {

            const result = await getAllCenters();
            setCenters(result);

        } catch (err) {

            addNotifications(convertError(err), types.error)
            console.error(err)
        }
        setIsloading(false)
    }

    return (
        <main className={styles.body}>

            <div className={styles.aboutContainer}> 
            </div>
            <h1>All centers registered in our site</h1>
            <section  className={styles.listing}>


                <div className={styles.centers}>
                    {!isLoading && (centers.length ?
                        centers.map(center => <CardItems data={center} key={uniqid()} />)
                        : (<div className={styles.noData}>
                            <p >There has no centers registerd yet...</p>
                        </div>)
                    )}
                    {isLoading && <p>Loading...</p>}
                    {/* {centers.length ?
                        centers.map(center => <CardItems data={center} key={uniqid()} />)
                        : (<div className={styles.noData}>
                            <p >There has no centers registerd yet...</p>
                        </div>)
                    } */}
                   
                </div>
            </section>
        </main>
    )
}