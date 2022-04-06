import {createStore, combineReducers, applyMiddleware} from 'redux';
import { productsReducer } from './products';
import { recipesReducer } from './recipes';
import { userReducer } from './user/reducer';
import { userRecipeReducer } from './newRecipe/reducer';
import storage from 'redux-persist/lib/storage';
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
// import persistReducer from "redux-persist/es/persistReducer";
// import persistStore from "redux-persist/es/persistStore";

// const persistConfig = {
//     key: 'root',
//     storage,
//     whitelist: ['user']
// }

const rootReducer = combineReducers({
    products: productsReducer,
    recipes: recipesReducer,
    user: userReducer,
    newRecipe: userRecipeReducer,
})

// const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
)

// export const persistedStore = persistStore(store)