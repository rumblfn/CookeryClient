import { ADD_NEW_RECIPE, SET_RECIPES, SET_RECIPES_ALL, CLEAR_REDUCER, STAR_RECIPE, SET_STARRED_RECIPES, setRecipeImages, SET_RECIPE_IMAGES } from './actions';
import Axios from 'axios';
import { nanoid } from 'nanoid';

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
        case SET_RECIPE_IMAGES: {
            return {
                ...state,
                userRecipes: {...state.userRecipes, [action.payload.id]: {...state.userRecipes[action.payload.id], images: [...action.payload.images]}}
            }
        }
        case SET_RECIPES_ALL: {
            console.log(action.payload)
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
            if (action.payload) {
                action.payload.forEach((item) => {
                    settedUserStarredRecipes[item.id] = {
                        comments: JSON.parse(item.comments),
                        cook: JSON.parse(item.cook),
                        description: JSON.parse(item.description),
                        id: item.id,
                        images: JSON.parse(item.images) || {},
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
            return state
        }
        case SET_RECIPES: {
            const settedUserRecipes = {}
            action.payload.forEach((item) => {
                settedUserRecipes[item.id] = {
                    comments: JSON.parse(item.comments),
                    cook: JSON.parse(item.cook),
                    description: JSON.parse(item.description),
                    id: item.id,
                    images: JSON.parse(item.images) || {},
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
            const images = {}
            const paths = []
            Object.keys(action.payload.images).forEach(item => {
                let image_path = `${nanoid(8)}${item}`
                paths.push(image_path)
                images[image_path] = action.payload.images[item]
            })
            Axios.post('/reciepes/insert', {
                ...action.payload, images: JSON.stringify(images)
            }).then((res) => {
                if (res) {
                    setRecipeImages({id: action.payload.id, images: [...res.data]})
                }
            })
            return {
                ...state,
                userRecipes: {...state.userRecipes, [action.payload.id]: {...action.payload, images: [...paths]}}
            }
        }
        case CLEAR_REDUCER: {
            return {...state, userRecipes: {}}
        }
        default: {
            return state
        }
    }
}