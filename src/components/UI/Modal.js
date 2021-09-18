// 这里需要使用portal
import ReactDOM from 'react-dom';
import React from 'react';
import classes from './Modal.module.css';



export function Backdrop(props){
    return <div className={classes.backdrop} onClick={props.onClose}></div>
}

export function ModalOverlay(props){
    return (
        <div className={classes.modal}>
            <div className={classes.content}>
                {props.children}
            </div>
        </div>
    );
    
}

const portalElement = document.getElementById('overlays');

function Modal(props){
    return (
        <React.Fragment>
            {ReactDOM.createPortal(<Backdrop onClose={props.onClose}/>, portalElement)}
            {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement)}
        </React.Fragment>
    );
}

export default Modal;
