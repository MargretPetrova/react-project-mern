import styles from '../items/FormItems.module.css'
export default function ListItems({data}){
   
    
    return( 
        <div className={styles.input} key={data.id}>
        <input type="text" className="input-field" placeholder={data.placeholder}  name={data.name} />
        <label className={styles.name}>{data.text}</label>
    </div>
)
}
