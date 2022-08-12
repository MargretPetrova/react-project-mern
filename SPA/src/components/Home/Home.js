
import styles from './Home.module.css'

import React , {useState, useEffect}from 'react';
import CardItems from '../Items/CardItems'

import uniqid from 'uniqid'
import { Link } from 'react-router-dom'

export default function Home() {
    useEffect(()=>{
        document.title = 'Home Page'
            }, []);

let [cards, setCards] = useState([{name:'Open Help Center', image:'../static/images/home2.jpg', description: 'If you are registered user you can open own help center for free!'}, 
{name:'Become a Volunteer', image:'../static/images/home3.jpg', description: 'Choose a center and become a volunteer in it only if you are registered user!'},
//  {name:'Donate', image:'./static/images/home4.jpg', description: 'Chose a center and make donation.'}
])

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
                {cards.map(item => <CardItems data={item} key={uniqid()} />)}

                </div>
            </section>
        </main>
	
  )
}


  
 
		
			
			

		
		
