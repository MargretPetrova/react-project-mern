import React , {useState, useEffect}from 'react';
import styles from '../Search/Search.module.css'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
<main className={styles.body}>

            <form className={styles.search} action="" method="GET">
                
                <input type="search" name="" placeholder="Location..."/>
               
                <button className={styles.button} type="submit">Search</button>
                
            </form>
            
            <section className={styles.findSection}>

                {/* <!-- If there are any matching matches from the search, show each of them --> */}

                <div className={styles.cardHome}>
            <h2>Hope center 1</h2>
            <div className={styles.cardImage}><img src="./static/images/center.jpg" /></div>
            <Link to="/catalog/l61wk2gf" className={styles.detailsLink}>Details</Link>

        </div>
                

                {/* <!-- If there are no search matches, show: --> */}
                {/* <!--<div class="no-data-listing">
                    <p class="no-offer">No match was found for the submitted type...</p>
                </div>--> */}
            </section>
        </main>
        )} 