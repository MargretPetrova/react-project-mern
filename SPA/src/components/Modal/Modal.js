import ReactDOM from 'react-dom';
import styles from '../Modal/Modal.module.css'

import React, { useContext } from 'react';

import ModalOvarlay from './ModalOverlay'

const Backdrop =(props)=>{
    return <div className={styles.backdrop} ></div>
}

const portalElement = document.getElementById('overlays')

const Modal =(props)=>{
    return <>
    {ReactDOM.createPortal(<Backdrop />, portalElement)}
    {ReactDOM.createPortal(<ModalOvarlay onClick={props.onClose}> {props.children}</ModalOvarlay>, portalElement)}
    </>
   

}
export default Modal;