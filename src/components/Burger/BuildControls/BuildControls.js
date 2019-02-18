import React from 'react';
import styles from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' }
];

const buildControls = (props) => {

    let buttonFunction = () => {
        props.onAuthHandler();
        props.onSetAuthRedirectPath('/checkout');
    }
    if (props.isAuth) buttonFunction = props.ordered;

    return (<div className={styles.BuildControls}>
        <p> Current price: <strong> ${props.price.toFixed(2)} </strong>  </p>
        {controls.map(ctrl => (
            <BuildControl
                label={ctrl.label}
                key={ctrl.label}
                added={() => props.ingredientAdded(ctrl.type)}
                removed={() => props.ingredientRemoved(ctrl.type)}
                disabled={props.disabled[ctrl.type]}
            />
        ))}
        <button
            className={styles.OrderButton}
            disabled={!props.purchasable}
            onClick={buttonFunction}> {props.isAuth ? "ORDER NOW" : "SING IN TO ORDER "} </button>
    </div>
    );
}



export default buildControls;