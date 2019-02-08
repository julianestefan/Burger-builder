import React from 'react';
import styles from './Button.module.css';

const button = (props) => (
    <button 
        className= { [ styles.Button, styles[props.type] ].join(' ') }
        type = { props.type !== "submit" ? 'button' : null }
        onClick = {props.clicked}
        disabled = {props.disabled} >
        {props.children}
    </button>
);

export default button;