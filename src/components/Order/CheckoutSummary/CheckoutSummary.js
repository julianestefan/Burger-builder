import React from 'react';
import Button from '../../UI/Button/Button';
import Burger from '../../Burger/Burger';
import Styles from './CheckoutSummary.module.css';

const checkoutSummary = (props) => {
    return (
        <div className = {Styles.CheckoutSummary}>
            <h1>
                We hope it tastes well!
            </h1>
            <div style = { {width: '100%', height: '300px', margin: 'auto'} }>
                <Burger ingredients={props.ingredients} />
            </div>
            <Button 
                type = "Danger"
                clicked = {props.onCheckoutCanceled}> CANCEL</Button>
            <Button 
                type = "Success"
                clicked = {props.onCheckoutContinued}> CONTINUE</Button>
        </div>
    );
}

export default checkoutSummary;