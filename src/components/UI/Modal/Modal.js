import React from 'react';
import styles from './Modal.module.css'
import Button from '../Button/Button'
import Backdrop from '../Backdrop/Backdrop';


const modal = (props) => (

    <>
        <Backdrop show= {props.show} />
        <div
            className={styles.Modal}
            style={{
                opacity: props.show ? '1' : '0',
                transform: props.show ? 'translateY(0)' : 'translateY(-100vh)'
            }}>
            {props.children}
            <Button
                clicked={props.closing}
                type="Danger">
                Cancel
        </Button>
            <Button
                clicked={props.continuing}
                type="Success">
                Continue
        </Button>
        </div>
    </>
);

export default modal;