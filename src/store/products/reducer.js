import { TOGGLE_SELECTED_STATE } from './actions';
import { FILTER_PRODUCTS } from './actions';
import { ADD_ALL_PRODUCTS } from './actions';

const initialState = {
    products: {},
    initialProducts: {},
    selectedProducts: {},
    selectedProductsNames: []
}

export const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ALL_PRODUCTS: {
            return {
                ...state, 
                products: {...state.products, ...action.payload}, 
                initialProducts: {...state.products, ...action.payload},
            }
        }
        case FILTER_PRODUCTS: {
            const newProducts = {}
            for (let item in state.initialProducts) {
                if (state.initialProducts[item].name.includes(action.payload)) {
                    newProducts[item] = state.initialProducts[item]
                }
            }
            return {
                ...state,
                products: {
                    ...newProducts
                }
            }
        }
        case TOGGLE_SELECTED_STATE: {
            const prods = {...state.initialProducts, ...state.selectedProducts}
            prods[action.payload].selected = !prods[action.payload].selected

            const newSelectedProducts = {}
            const newSelectedProductsNames = []
            for (let item in prods) {
                if (prods[item].selected) {
                    newSelectedProducts[item] = prods[item]
                    newSelectedProductsNames.push(prods[item].name)
                }
            }

            return {
                ...state,
                products: prods,
                selectedProducts: newSelectedProducts,
                selectedProductsNames: newSelectedProductsNames
            }
        }
        default: {
            return state
        }
    }
}