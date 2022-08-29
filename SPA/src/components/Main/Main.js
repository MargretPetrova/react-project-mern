import styles from '../Main/Main.module.css'
const Main =(props)=>{
    return (
        <main className={styles.body}>
            {props.children}
        </main>
    )
}
export default Main;