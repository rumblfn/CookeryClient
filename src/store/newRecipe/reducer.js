import { 
    SET_USER_RECIPE_NEW_DATA,
    CHANGE_NEW_RECIPE_PRODUCT_COUNT
} from './actions';

const initialState = {
    time: null,
    title: null,
    actions: [],
    description: null,
    images: [],
    products: [],
    productsWithCount: [],
    rating: 0,
    comments: []
}

export const userRecipeReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_RECIPE_NEW_DATA: {
            return {...state, ...action.payload}
        }
        case CHANGE_NEW_RECIPE_PRODUCT_COUNT: {
            return {...state, productsWithCount: state.productsWithCount.map(
                function(product) {
                    if (product[0] === action.payload.productName) {
                        return [product[0], action.payload.text]
                    } return product
                }
            )}
        }
        default: {
            return state
        }
    }
}