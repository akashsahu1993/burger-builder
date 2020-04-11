import * as actionTypes from './actionTypes';

export const addIngredient = (ingName) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: ingName
    }
};

export const removeIngredient = (ingName) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: ingName
    }
};

export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    }
};
export const initIngredients = () => {
    return {
        type: actionTypes.INIT_INGREDIENT
    }
    // return dispatch => {
    //     axios.get('ingredients.json')
    //         .then(response => {
    //             dispatch(setIngredients(response.data));
    //         }).catch(error => {
    //         dispatch(fetchIngredientsFailed(error));
    //     });
    // }
};

export const fetchIngredientsFailed = (error) => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED,
        error: error
    }
};