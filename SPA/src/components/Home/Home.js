
import styles from './Home.module.css'

import React , {useState, useEffect}from 'react';
import CardItems from '../Items/CardItems'

import uniqid from 'uniqid'
import { Link } from 'react-router-dom'

export default function Home() {
    useEffect(()=>{
        document.title = 'Home Page'
            }, []);

let [cards, setCards] = useState([{name:'Open Help Center', image:'../static/images/home2.jpg'}, 
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


  
 
		
			
			

		
		
// 		<div id="fh5co-feature-product" class="fh5co-section-gray">
// 			<div class="container">
// 				<div class="row">
// 					<div class="col-md-12 text-center heading-section">
// 						<h3>How we started.</h3>
// 						<p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
// 					</div>
// 				</div>

// 				<div class="row row-bottom-padded-md">
// 					<div class="col-md-12 text-center animate-box">
// 						<p><img src="images/cover_bg_1.jpg" alt="Free HTML5 Bootstrap Template" class="img-responsive"></p>
// 					</div>
// 					<div class="col-md-6 text-center animate-box">
// 						<p><img src="images/cover_bg_2.jpg" alt="Free HTML5 Bootstrap Template" class="img-responsive"></p>
// 					</div>
// 					<div class="col-md-6 text-center animate-box">
// 						<p><img src="images/cover_bg_3.jpg" alt="Free HTML5 Bootstrap Template" class="img-responsive"></p>
// 					</div>
// 				</div>
// 				<div class="row">
// 					<div class="col-md-4">
// 						<div class="feature-text">
// 							<h3>Love</h3>
// 							<p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
// 						</div>
// 					</div>
// 					<div class="col-md-4">
// 						<div class="feature-text">
// 							<h3>Compassion</h3>
// 							<p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
// 						</div>
// 					</div>
// 					<div class="col-md-4">
// 						<div class="feature-text">
// 							<h3>Charity</h3>
// 							<p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
// 						</div>
// 					</div>
// 				</div>

				
// 			</div>
// 		</div>

		
// 		<div id="fh5co-portfolio">
// 			<div class="container">

// 				<div class="row">
// 					<div class="col-md-6 col-md-offset-3 text-center heading-section animate-box">
// 						<h3>Our Gallery</h3>
// 						<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit est facilis maiores, perspiciatis accusamus asperiores sint consequuntur debitis.</p>
// 					</div>
// 				</div>

				
// 				<div class="row row-bottom-padded-md">
// 					<div class="col-md-12">
// 						<ul id="fh5co-portfolio-list">

// 							<li class="two-third animate-box" data-animate-effect="fadeIn" style="background-image: url(images/cover_bg_1.jpg); ">
// 								<a href="#" class="color-3">
// 									<div class="case-studies-summary">
// 										<span>Give Love</span>
// 										<h2>Donation is caring</h2>
// 									</div>
// 								</a>
// 							</li>
						
// 							<li class="one-third animate-box" data-animate-effect="fadeIn" style="background-image: url(images/cover_bg_3.jpg); ">
// 								<a href="#" class="color-4">
// 									<div class="case-studies-summary">
// 										<span>Give Love</span>
// 										<h2>Donation is caring</h2>
// 									</div>
// 								</a>
// 							</li>

// 							<li class="one-third animate-box" data-animate-effect="fadeIn" style="background-image: url(images/cover_bg_1.jpg); "> 
// 								<a href="#" class="color-5">
// 									<div class="case-studies-summary">
// 										<span>Give Love</span>
// 										<h2>Donation is caring</h2>
// 									</div>
// 								</a>
// 							</li>
// 							<li class="two-third animate-box" data-animate-effect="fadeIn" style="background-image: url(images/cover_bg_3.jpg); ">
// 								<a href="#" class="color-6">
// 									<div class="case-studies-summary">
// 										<span>Give Love</span>
// 										<h2>Donation is caring</h2>
// 									</div>
// 								</a>
// 							</li>
// 						</ul>		
// 					</div>
// 				</div>

// 				<div class="row">
// 					<div class="col-md-4 col-md-offset-4 text-center animate-box">
// 						<a href="#" class="btn btn-primary btn-lg">See Gallery</a>
// 					</div>
// 				</div>

				
// 			</div>
// 		</div>
		

		
// 		<div id="fh5co-content-section" class="fh5co-section-gray">
// 			<div class="container">
// 				<div class="row">
// 					<div class="col-md-8 col-md-offset-2 text-center heading-section animate-box">
// 						<h3>Leadership</h3>
// 						<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit est facilis maiores, perspiciatis accusamus asperiores sint consequuntur debitis.</p>
// 					</div>
// 				</div>
// 			</div>
// 			<div class="container">
// 				<div class="row">
// 					<div class="col-md-4">
// 						<div class="fh5co-team text-center animate-box">
// 							<figure>
// 								<img src="images/person_1.jpg" alt="user">
// 							</figure>

// 							<div>
// 								<h3>Jean Doe</h3>
// 								<p><span>Founder</span></p>
// 								<p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
// 							</div>
							
// 							<p class="fh5co-social-icons">
// 								<a href="#"><i class="icon-twitter2"></i></a>
// 								<a href="#"><i class="icon-linkedin2"></i></a>
// 								<a href="#"><i class="icon-facebook3"></i></a>
// 							</p>
// 						</div>
// 					</div>
// 					<div class="col-md-4">
// 						<div class="fh5co-team text-center animate-box">
// 							<figure>
// 								<img src="images/person_2.jpg" alt="user">
// 							</figure>
// 							<div>
// 								<h3>John Doe</h3>
// 								<p><span>Founder</span></p>
// 								<p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
// 							</div>
// 							<p class="fh5co-social-icons">
// 								<a href="#"><i class="icon-twitter2"></i></a>
// 								<a href="#"><i class="icon-linkedin2"></i></a>
// 								<a href="#"><i class="icon-facebook3"></i></a>
// 							</p>
// 						</div>
// 					</div>
// 					<div class="col-md-4">
// 						<div class="fh5co-team text-center animate-box">
// 							<figure>
// 								<img src="images/person_3.jpg" alt="user">
// 							</figure>
// 							<div>
// 								<h3>John Doe</h3>
// 								<p><span>Founder</span></p>
// 								<p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
// 							</div>
// 							<p class="fh5co-social-icons">
// 								<a href="#"><i class="icon-twitter2"></i></a>
// 								<a href="#"><i class="icon-linkedin2"></i></a>
// 								<a href="#"><i class="icon-facebook3"></i></a>
// 							</p>
// 						</div>
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 		<!-- fh5co-content-section -->

		
// 		<footer>
// 			<div id="footer">
// 				<div class="container">
// 					<div class="row">
// 						<div class="col-md-6 col-md-offset-3 text-center">
// 							<p class="fh5co-social-icons">
// 								<a href="#"><i class="icon-twitter2"></i></a>
// 								<a href="#"><i class="icon-facebook2"></i></a>
// 								<a href="#"><i class="icon-instagram"></i></a>
// 								<a href="#"><i class="icon-dribbble2"></i></a>
// 								<a href="#"><i class="icon-youtube"></i></a>
// 							</p>
// 							<p>Copyright 2016 Free Html5 <a href="#">Charity</a>. All Rights Reserved. <br>Made with <i class="icon-heart3"></i> by <a href="http://freehtml5.co/" target="_blank">Freehtml5.co</a> / Demo Images: <a href="https://unsplash.com/" target="_blank">Unsplash</a></p>
// 						</div>
// 					</div>
// 				</div>
// 			</div>
// 		</footer>
	

// 	</div>
// 	<!-- END fh5co-page -->

// 	</div>
// 	<!-- END fh5co-wrapper -->

// 	<!-- jQuery -->


// 	<script src="js/jquery.min.js"></script>
// 	<!-- jQuery Easing -->
// 	<script src="js/jquery.easing.1.3.js"></script>
// 	<!-- Bootstrap -->
// 	<script src="js/bootstrap.min.js"></script>
// 	<!-- Waypoints -->
// 	<script src="js/jquery.waypoints.min.js"></script>
// 	<script src="js/sticky.js"></script>

// 	<!-- Stellar -->
// 	<script src="js/jquery.stellar.min.js"></script>
// 	<!-- Superfish -->
// 	<script src="js/hoverIntent.js"></script>
// 	<script src="js/superfish.js"></script>
	
// 	<!-- Main JS -->
// 	<script src="js/main.js"></script>

// 	</body>
// </html>

