import React from 'react';
import styles from './Burger.module.css';
import BurgerIngredient from './BurgerIngredients/BurgerIngredient';

const burger = (props) => {

    const ingredients = [];

    for (let key in props.ingredients){
        for (let i = 0; i < props.ingredients[key]; i++ ) ingredients.push( key );
    }

    let transformedIngredients = ingredients.map( ingredient => <BurgerIngredient type = {ingredient} />);   

    if (transformedIngredients.length === 0){
        transformedIngredients = <p>Please start adding ingredients!!</p>;
    }

    return(
        <div className={styles.Burger}>
            <BurgerIngredient type='bread-top'/>
            {transformedIngredients}
            <BurgerIngredient type='bread-bottom'/>
        </div>
    );
};

export default burger;