import styles from '../Forms/Form.module.css'



const Form = (props) => {
    return (

        <form className={styles.cardForm} method={props.method} onSubmit={props.handler}>
            {props.children}
            <div className={styles.action}>
                <button className={styles.actionButton}>{props.action}</button>
            </div>
        </form>
    )


}
export default Form;