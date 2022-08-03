import { Link } from 'react-router-dom'
import styles from '../items/CardItems.module.css'
export default function ListItems({data}) {
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
    return (

        <div className={styles.cardHome}>
            <h2>{data.name}</h2>
            <div className={styles.cardImage}><img src={data.image} /></div>
            <Link to={linkTo} className={styles.detailsLink}>Details</Link>

        </div>
    )
}
