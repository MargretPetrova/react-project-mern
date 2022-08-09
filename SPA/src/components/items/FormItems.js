import styles from './FormItems.module.css'
export default function ListItems({ data }) {
    let type = 'text';
    if (data.name == 'password' || data.name == 'rePassword') {
        type = 'password'
    }


    return (
        <div className={styles.input} key={data.id}>
            <input type={type} className={styles.inputField} placeholder={data.placeholder} name={data.name} />
            <label className={styles.name}>{data.text}</label>
        </div>
    )
}
