import React from 'react';
import Button from '../../UI/Button/Button';
import Burger from '../../Burger/Burger';
import Styles from './OrderSummary.module.css';

const orderSummary = (props) => {
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
                clicked> CANCEL</Button>
            <Button 
                type = "Success"
                clicked> CONTINUE</Button>
        </div>
    );
}

export default orderSummary;