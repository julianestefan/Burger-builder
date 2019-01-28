import * as ActionTypes from './ActionTypes';
import axios from '../../shared/axios-orders';

export const addIngredient = (name) => {
    return {
        type: ActionTypes.ADD_INGREDIENT,
        ingredientName: name
    };
}

export const removeIngredient = (name) => {
    return {
        type: ActionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    };
}

export const setIngredients = (ingredients) => {
    return {
        type: ActionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    };
}

export const fetchIngredientsFailed = () => {
    return {
        type: ActionTypes.FETCH_INGREDIENTS_FAILED
    };
}

export const initIngredients = () => {
    return dispatch => {
        axios.get( 'https://burger-builder-efa3a.firebaseio.com/ingredients.json' )
            .then( response => {
               dispatch(setIngredients(response.data));
            } )
            .catch( error => {
                console.log(error);
                dispatch(fetchIngredientsFailed());
            } );
    };
};