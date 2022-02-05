import {connect} from "react-redux";
import { getRecipes, getUserRecipes } from '../../store/recipes';
import { getSelectedProducts } from '../../store/products';
import { addNewRecipeReducer } from '../../store/recipes';
import { setRicepesReducer } from "../../store/recipes";
import { starRecipeRecipeReducer } from "../../store/recipes";

const mapStateToProps = (state) => ({
    recipes: getRecipes(state),
    userRecipes: getUserRecipes(state),
    selectedProducts:  getSelectedProducts(state),
})

const mapDispatchToProps = (dispatch) => ({
    addNewRecipe(item) {
        return dispatch(addNewRecipeReducer(item));
    },
    setRicepes(data) {
        return dispatch(setRicepesReducer(data))
    },
    starRecipeRecipe(data) {
        return dispatch(starRecipeRecipeReducer(data))
    }
})

export const recipesConnect = connect(mapStateToProps, mapDispatchToProps);