import { Link } from "react-router-dom";
import styles from './ErrorPage.module.css'

export default function ErrorPage() {
    return (
        <main>
            <div className={styles.notFoundContainer}>
                <h1>404</h1>
                <h2>Page Not Found</h2>

                <p>The Page you are looking for doesn't exist or another error occurred. Go to <Link to="/">Go to Home </Link></p>
            </div>
        </main>
          
      
    )
}