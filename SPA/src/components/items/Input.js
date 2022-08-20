import styles from './FormItems.module.css';
import React, {useRef, useImperativeHandle} from 'react';

const Input = React.forwardRef((props,ref)=> {
    const inputRef = useRef();
    const activate = ()=>{
        inputRef.current.focus()
    }
    useImperativeHandle(ref,()=>{
        return {
            focus: activate
        }
    })

    let type = 'text';
    if (props.name == 'password' || props.name == 'rePassword') {
        type = 'password'
    }
    

    return (
        <div className={styles.input} key={props.id}>
            <input ref={inputRef} type={props.type} className={styles.inputField}
             placeholder={props.placeholder} name={props.name} onBlur={props.onBlur}
             defaultValue={props.value}
           />
           <label className={styles.info}>{props.info}</label>
            <label className={styles.name}>{props.text}</label>
        </div>
    )
})
export default Input;
