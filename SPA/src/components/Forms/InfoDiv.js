import styles from './InfoDiv.module.css';
import { Link } from 'react-router-dom';

const InfoDiv = (props)=>{
    return (
        <div className={styles.cardInfo}>
        <small>{props.heading}<Link to={props.to}> {props.action}</Link>
        </small>
    </div>
    )
}

export default InfoDiv;