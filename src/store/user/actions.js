export const SET_USER_DATA = 'SET_USER_DATA';
export const STAR_RECIPE = 'STAR_RECIPE';
export const CHANGE_IMAGE = 'CHANGE_IMAGE';

export const setUserDataReducer = (data) => ({
    type: SET_USER_DATA,
    payload: data,
})

export const starRecipeUserReducer = (data)  => ({
    type: STAR_RECIPE,
    payload: data,
})

export const setUserProfileImage = (payload) => ({
    type: CHANGE_IMAGE,
    payload
})