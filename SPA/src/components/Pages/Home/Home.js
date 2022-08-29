
import styles from './Home.module.css'

import React , {useState, useEffect}from 'react';
import CardItems from '../../Items/CardItems'

import uniqid from 'uniqid'
import { homeCards } from '../../../helpers/texts';

export default function Home() {
    useEffect(()=>{
        document.title = 'Home Page'
            }, []);

  return (
	<main>
	<section id="home-page" className={styles.backgroundImage}>
                <div className={styles.homeContainer}>

                    <div className={styles.info}>
                        <h1>Help the people</h1>
                        <h2>of Ukraine</h2>
                    </div>

                </div>
            </section>

            <section className={styles.centers}>
                <h1>Support with Hummanitarian Aid</h1>
                <div className={styles.houses}>
                {homeCards.map(item => <CardItems data={item} key={uniqid()} />)}

                </div>
            </section>
        </main>
	
  )
}


  
 
		
			
			

		
		
