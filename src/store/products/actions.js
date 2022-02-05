export const TOGGLE_SELECTED_STATE = 'TOGGLE_SELECTED_STATE';
export const FILTER_PRODUCTS = 'FILTER_PRODUCTS'
export const ADD_ALL_PRODUCTS = 'ADD_ALL_PRODUCTS'

export const toggleSelectedState = (key) => ({
    type: TOGGLE_SELECTED_STATE,
    payload: key,
})

export const filterProducts = (text) => ({
    type: FILTER_PRODUCTS,
    payload: text,
})

export const addProductsWithAPI = (payload) => ({
    type: ADD_ALL_PRODUCTS,
    payload
})