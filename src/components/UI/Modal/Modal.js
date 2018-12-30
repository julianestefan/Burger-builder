import React from 'react';
import styles from './Modal.module.css'


const modal = (props) => (
    <div 
        className = {styles.Modal }
        style = {{
            opacity: props.show ? '1' : '0',
            transform: props.show ? 'translateY(0)' : 'translateY(-100vh)'
        }}>
        {props.children}
    </div>
);

export default modal;