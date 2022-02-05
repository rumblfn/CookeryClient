import { SET_USER_DATA, STAR_RECIPE, CHANGE_IMAGE } from './actions';

const initialState = {
    loged: false,
    id: null,
    name: null,
    mail: null,
    likes: null,
    recipes: [],
    likedPostsIdes: [],
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_IMAGE: {
            return {...state, image: action.payload}
        }
        case SET_USER_DATA: {
            if (action.payload.likedPostsIdes === null) {
                return {...state, ...action.payload, 
                    loged: true, likedPostsIdes: []}
            }   return {...state, ...action.payload, 
            loged: true, likedPostsIdes: action.payload.likedPostsIdes.split(';') || []}
        }
        case STAR_RECIPE: {
            switch (action.payload.starred) {
                case true: {
                    let likedPostIdesCopy = [...state.likedPostsIdes]
                    const index = likedPostIdesCopy.indexOf(action.payload.recipeId);
                    if (index > -1) {
                        likedPostIdesCopy.splice(index, 1);
                    }
                    return {...state, likedPostsIdes: likedPostIdesCopy}
                }
                case false: {
                    return {...state, likedPostsIdes: [...state.likedPostsIdes, action.payload.recipeId]}
                }
                default: {
                    return state
                }
            }
        }
        default: {
            return state
        }
    }
}