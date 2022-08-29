import styles from './Section.module.css'


const imageObj ={ 
    'Login': styles.image1,
    'Create your own account': styles.image1
 }

 
const Section = (props)=>{

    return (
        <section id="create-page">

                <div className={styles.boxs}>
                    <div className={imageObj[props.heading]? imageObj[props.heading] : styles.image}>
                        <h2 className={styles.cardHeading}>{props.heading}</h2>
                    </div>
                    {props.children}
                    </div>
            </section>
    )
}
export default Section;