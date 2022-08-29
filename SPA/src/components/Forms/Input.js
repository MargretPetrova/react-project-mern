import styles from './Input.module.css';
import React, { useRef, useImperativeHandle } from 'react';

const Input = React.forwardRef((props, ref) => {
    const inputRef = useRef();
    const activate = () => {
        inputRef.current.focus()
    }
    useImperativeHandle(ref, () => {
        return {
            focus: activate
        }
    })


    function style(error) {
        if (error && error.hasError== true) {
          return {
           borderColor: "rgba(255, 0, 0, 0.5)"
           
          };
        }
      }


    return (
        <div className={styles.input} key={props.id}>
            <div className = {styles.errors}>
            {props.error && (
        <label className={styles.alert} >
          {props.error.msg}
        </label>
      )}
            </div>
    
            <input
             ref={inputRef}
             type={props.type}
              className={styles.inputField}
                placeholder={props.placeholder} 
                name={props.name} 
                onBlur={props.onBlur}
                defaultValue={props.value}
                 onChange={props.onChange}
                 pattern = {props.pattern}
             style={style(props.error)}
            />
     

            <label className={styles.name}>{props.text}</label>
         
        </div>
    )
})
export default Input;
