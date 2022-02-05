import { ADD_NEW_RECIPE, SET_RECIPES, SET_RECIPES_ALL, CLEAR_REDUCER, STAR_RECIPE, SET_STARRED_RECIPES } from './actions';
import Axios from 'axios';

const initialState = {
    userRecipes: {},
    recipes: {},
    starred_recipes: {},
}

export const recipesReducer = (state = initialState, action) => {
    switch (action.type) {
        case STAR_RECIPE: {
            switch (action.payload.starred) {
                case true: {
                    let userRecipeCopy = {...state.userRecipes}
                    let recipesCopy = {...state.recipes}
                    const recipeId = action.payload.recipeId
                    if (recipeId in userRecipeCopy) {
                        userRecipeCopy[recipeId].rating -= 1;
                    }
                    if (recipeId in recipesCopy) {
                        recipesCopy[recipeId].rating -= 1;
                    }
                    return {...state, userRecipes: userRecipeCopy, recipes: recipesCopy}
                }
                case false: {
                    let userRecipeCopy = {...state.userRecipes}
                    let recipesCopy = {...state.recipes}
                    const recipeId = action.payload.recipeId
                    if (recipeId in userRecipeCopy) {
                        userRecipeCopy[recipeId].rating += 1;
                    }
                    if (recipeId in recipesCopy) {
                        recipesCopy[recipeId].rating += 1;
                    }
                    return {...state, userRecipes: userRecipeCopy, recipes: recipesCopy}
                }
                default: {
                    return state
                }
            }
        }
        case SET_RECIPES_ALL: {
            const settedRecipes = {}
            action.payload.forEach((item) => {
                settedRecipes[item.id] = {
                    comments: JSON.parse(item.comments),
                    cook: JSON.parse(item.cook),
                    description: JSON.parse(item.description),
                    id: item.id,
                    images: JSON.parse(item.images) || [],
                    lstOfProducts: JSON.parse(item.lstOfProducts),
                    products: JSON.parse(item.products),
                    rating: item.rating,
                    time: item.time,
                    title: item.title,
                    userId: item.userId
                }
            })
            return {...state, recipes: {...state.recipes, ...settedRecipes}}
        }
        case SET_STARRED_RECIPES: {
            const settedUserStarredRecipes = {}
            action.payload.forEach((item) => {
                settedUserStarredRecipes[item.id] = {
                    comments: JSON.parse(item.comments),
                    cook: JSON.parse(item.cook),
                    description: JSON.parse(item.description),
                    id: item.id,
                    images: JSON.parse(item.images) || [],
                    lstOfProducts: JSON.parse(item.lstOfProducts),
                    products: JSON.parse(item.products),
                    rating: item.rating,
                    time: item.time,
                    title: item.title,
                    userId: item.userId
                }
            })
            return {...state, starred_recipes: {...settedUserStarredRecipes}}
        }
        case SET_RECIPES: {
            const settedUserRecipes = {}
            action.payload.forEach((item) => {
                settedUserRecipes[item.id] = {
                    comments: JSON.parse(item.comments),
                    cook: JSON.parse(item.cook),
                    description: JSON.parse(item.description),
                    id: item.id,
                    images: JSON.parse(item.images) || [],
                    lstOfProducts: JSON.parse(item.lstOfProducts),
                    products: JSON.parse(item.products),
                    rating: item.rating,
                    time: item.time,
                    title: item.title,
                    userId: item.userId
                }
            })
            return {...state, userRecipes: {...state.userRecipes, ...settedUserRecipes}}
        }
        case ADD_NEW_RECIPE: {
            Axios.post('https://cookery-app.herokuapp.com/reciepes/insert', {
                ...action.payload, images: JSON.stringify(action.payload.images)
            }).then(() => {})
            return {...state,
                userRecipes: {...state.userRecipes, [action.payload.id]: action.payload}}
        }
        case CLEAR_REDUCER: {
            return {...state, userRecipes: {}}
        }
        default: {
            return state
        }
    }
}