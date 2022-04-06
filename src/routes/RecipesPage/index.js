import { useParams } from "react-router-dom";
import { RecipeInfo } from "../../components/Recipe/recipe";
import React from "react";


export const RecipesPage = () => {
    const {recipeId, page} = useParams();
    return (
        <div>
            <RecipeInfo page={page} id={recipeId}/>
        </div>
    )
}