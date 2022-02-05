export const SET_USER_RECIPE_NEW_DATA = 'SET_USER_RECIPE_NEW_DATA';
export const CHANGE_NEW_RECIPE_PRODUCT_COUNT = 'CHANGE_NEW_RECIPE_PRODUCT_COUNT';

export const setUserRecipeNewDataReducer = (data) => ({
    type: SET_USER_RECIPE_NEW_DATA,
    payload: data,
})

export const changeUserRecipeProductCountReducer = (data) => ({
    type: CHANGE_NEW_RECIPE_PRODUCT_COUNT,
    payload: data,
})