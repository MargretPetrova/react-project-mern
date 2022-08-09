import { Link, useNavigate } from 'react-router-dom'
import styles from './CardItems.module.css'
export default function ListItems({data}) {
    const navigate = useNavigate();
    let linkTo=''
if(data.name =='Open Help Center'){
   linkTo='/create'
}else if(data.name =='Become a Volunteer'){
linkTo='/catalog'
}else if(data.name =='Donate'){
    linkTo='/catalog'

}else if (data._id){
    linkTo = `/catalog/${data._id}`
}
function onDetailsHandler(){
navigate(`${linkTo}`)
}
    return (

        <div className={styles.cardHome}>
            <h2>{data.name}</h2>
            <div className={styles.cardImage}><img src={data.image} /></div>
            <p>{data.description}</p>
            <div className={styles.btn}>
            <button className={styles.details} onClick={onDetailsHandler}>Details</button>
            </div>

        </div>
    )
}
