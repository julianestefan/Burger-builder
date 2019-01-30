import React from 'react';
import Style from './Order.module.css';

const order = (props) =>{
    const ingredients = [];

    for (let ingredientName in props.ingredients){
        ingredients.push({
            name: ingredientName, 
            ammount: props.ingredients[ingredientName]
        });
    }

    const ingredientsOutput = ingredients.map( ingredient => {
        return <span 
            key = {ingredient.name}
            className = {Style.OrderIngredient}
            > {ingredient.name} ({ingredient.ammount}) </span>
    })

    return (
        <div className = {Style.Order}>
            <p>Ingredients: {ingredientsOutput} </p>
            <p> price: <strong> USD { Number.parseFloat(props.price).toFixed(2) } </strong> </p>
        </div>
    );
}

export default order;