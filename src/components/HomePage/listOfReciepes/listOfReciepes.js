import { recipesConnect } from "../../../connect/recipes/recipes"
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import { useSelector } from 'react-redux';
import "./style.css";

let css = {display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '16px'}

export const Widget = recipesConnect(({otherRecipes, timeFilter, searchField, format, allRecipesBool, userRecipes, setRicepes, setIsLoading, recipes, selectedProducts}) => {
    let newRecipes = {}

    if (allRecipesBool) {

        if (format === 'computer') { css = {...css, gridTemplateColumns: '1fr 1fr 1fr 1fr'}
        } else if (format === 'laptop') { css = {...css, gridTemplateColumns: '1fr 1fr 1fr'}
        } else if (format === 'tablet') { css = {...css, gridTemplateColumns: '1fr 1fr 1fr'}
        } else if (format === 'tablet2') { css = {...css, gridTemplateColumns: '1fr 1fr'}
        } else if (format === 'phone') { css = {...css, gridTemplateColumns: '1fr'}
        } 

        if (allRecipesBool === 'starred') {
            newRecipes = useSelector(state => state.recipes.starred_recipes)
        } else {
            newRecipes = {...recipes}
        }

    } else {

        if (format === 'computer') { css = {...css, gridTemplateColumns: '1fr 1fr 1fr'}
        } else if (format === 'laptop') { css = {...css, gridTemplateColumns: '1fr 1fr'}
        } else if (format === 'tablet') { css = {...css, gridTemplateColumns: '1fr 1fr'}
        } else if (format === 'tablet2') { css = {...css, gridTemplateColumns: '1fr'}
        } else if (format === 'phone') { css = {...css, gridTemplateColumns: '1fr'} }

        useEffect(() => {
            if (Object.keys(recipes).length <= Object.keys(userRecipes).length) {
                setIsLoading(true)
                Axios.get('/recipes/get')
                    .then((response) => {
                        setRicepes(response.data)
                        setIsLoading(false)
                    }
                )
            }
        }, [])
    
        const isEmpty = (obj) => { for (let key in obj) { return true } return false }
    
        const checkProductsInRecipe = (recipe, prods) => {
            for (let key in prods) {
                if (recipe.lstOfProducts.includes(prods[key].name.toLowerCase())) {
                    return true
                }} return false }
        
        if (isEmpty(selectedProducts)) {
            for (let recipe in recipes) {
                if (checkProductsInRecipe(recipes[recipe], selectedProducts)) {
                    newRecipes[recipe] = {...recipes[recipe]}}}}}

    const numberSort = function (a, b) {
        return a - b;
    };

    const arr = []

    const recipesPreparation = [...Object.values(newRecipes)]
    const recipesIds = []
    for (let recipe of recipesPreparation) {
        recipesIds.push(recipe.id)
    }

    if (timeFilter !== 0) {
        recipesPreparation.sort(function (recipe1, recipe2) {
            const splitted_time1 = recipe1.time.split(':')
            const splitted_time2 = recipe2.time.split(':')
            const number1 = +splitted_time2[0] * 60 + +splitted_time2[1]
            const number2 = +splitted_time1[0] * 60 + +splitted_time1[1]
            if (timeFilter === -1) {
                return numberSort(number1, number2)
            }
            return numberSort(number2, number1)
        })
    }

    return (
        <div>
            <div style={css}>
                {recipesPreparation.map(item => (item.title.toLowerCase().includes(searchField) ?
                    <Link to={`/recipes/${item.id}/${allRecipesBool === 'starred' ? 'starred' : 'all'}`} key={item.id}>
                        <Paper elevation={3} className="paper-recipe-box" style={{
                            borderRadius: '7px', height: '200px', overflow: 'hidden', position: 'relative',
                            justifyContent: 'space-between', display: 'flex', alignItems: 'center', flexDirection: 'column'
                        }}>
                            {Object.values(item.images) ? 
                                <img style={{width: '100%', height: '100%', objectFit: 'cover'}} src={`/reciepes/${item.images[0]}`} alt='food'/>
                                : <div style={{backgroundColor: 'black', width: '100%', height: '100%', position: 'relative'}}/>
                            }
                            <div className="overlay">
                                <div className="text">{item.title}</div>
                            </div>
                        </Paper>
                    </Link>
                : null))}
            </div>
            <div>
                {otherRecipes.length !== 0 && <h4 style={{marginTop: '36px'}}>Другие рецепты...</h4>}
                <div style={css}>
                    {
                        otherRecipes.filter(item => !recipesIds.includes(item.id)).map(item => (
                            <Link to={`/recipes/${item.id}/${allRecipesBool === 'starred' ? 'starred' : 'all'}`} key={item.id}>
                                <Paper elevation={3} className="paper-recipe-box" style={{
                                    borderRadius: '7px', height: '200px', overflow: 'hidden', position: 'relative',
                                    justifyContent: 'space-between', display: 'flex', alignItems: 'center', flexDirection: 'column'
                                }}>
                                    {Object.values(item.images) ?
                                        <img style={{width: '100%', height: '100%', objectFit: 'cover'}} src={`/reciepes/${item.images[0]}`} alt='food'/>
                                        : <div style={{backgroundColor: 'black', width: '100%', height: '100%', position: 'relative'}}/>
                                    }
                                    <div className="overlay">
                                        <div className="text">{item.title}</div>
                                    </div>
                                </Paper>
                            </Link>
                    ))}
                </div>
            </div>
        </div>
    )
})

export const ListOfReciepes = ({otherRecipes, format, allRecipesBool, timeFilter, searchField}) => {
    const [isLoading, setIsLoading] = useState(false);

    return <Widget otherRecipes={otherRecipes} format={format} allRecipesBool={allRecipesBool} timeFilter={timeFilter}
                isLoading={isLoading} setIsLoading={setIsLoading} searchField={searchField}/>
}