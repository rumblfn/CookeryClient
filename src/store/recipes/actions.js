export const ADD_NEW_RECIPE = 'ADD_NEW_RECIPE';
export const SET_RECIPES = 'SET_RECIPES';
export const SET_RECIPES_ALL = 'SET_RECIPES_ALL';
export const CLEAR_REDUCER = 'CLEAR_REDUCER';
export const STAR_RECIPE = 'STAR_RECIPE';
export const SET_STARRED_RECIPES ='SET_STARRED_RECIPES';
export const SET_RECIPE_IMAGES = 'SET_RECIPE_IMAGES';

export const addNewRecipeReducer = (recipe) => ({
    type: ADD_NEW_RECIPE,
    payload: recipe,
})

export const setRecipesWithAPI = (recipes) => ({
    type: SET_RECIPES,
    payload: recipes,
})

export const setRicepesReducer = (data) => ({
    type: SET_RECIPES_ALL,
    payload: data
})

export const clearReducer = () => ({
    type: CLEAR_REDUCER
})

export const starRecipeRecipeReducer = (data)  => ({
    type: STAR_RECIPE,
    payload: data,
})

export const setStarredRecipes = (payload) => ({
    type: SET_STARRED_RECIPES,
    payload
})

export const setRecipeImages = (payload) => ({
    type: SET_RECIPE_IMAGES,
    payload
})