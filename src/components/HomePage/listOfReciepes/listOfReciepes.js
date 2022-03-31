import { recipesConnect } from "../../../connect/recipes/recipes"
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import { Search } from '../../../components/searchLine/index'
import { useSelector } from 'react-redux';
import "./style.css";

let css = {display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '48px'}

export const Widget = recipesConnect(({searchField, setSearchField, format, allRecipesBool, userRecipes, setRicepes, setIsLoading, recipes, selectedProducts}) => {
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
                Axios.get('https://cookery-app.herokuapp.com/recipes/get')
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
    
    const setSearchFieldFunc = (val) => {
        setSearchField(val)
    }

    useEffect(() => {
        console.log(searchField)
    }, [searchField])

    return (
        <div>
            {/* { allRecipesBool ? 
            <Search setSearchFieldFunc={setSearchFieldFunc} format={format}/> 
            : null } */}
            <div style={css}>
                {Object.values(newRecipes).map(item => (
                    <Link to={`/recipes/${item.id}/${allRecipesBool === 'starred' ? 'starred' : 'all'}`} key={item.id}>
                        <Paper elevation={3} className="paper-recipe-box" style={{
                            borderRadius: '7px', height: '200px', overflow: 'hidden', position: 'relative',
                            justifyContent: 'space-between', display: 'flex', alignItems: 'center', flexDirection: 'column'
                        }}>
                            {item.images[0] ? 
                                <img style={{width: '100%', height: '100%', objectFit: 'cover'}} src={item.images[0]} alt='food'/>
                                : <div style={{backgroundColor: 'black', width: '100%', height: '100%', position: 'relative'}}/>
                            }
                            <div class="overlay">
                                <div class="text">{item.title}</div>
                            </div>
                        </Paper>
                    </Link>
                ))}
            </div>
        </div>
    )
})

export const ListOfReciepes = ({format, allRecipesBool}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [searchField, setSearchField] = useState('')

    return <Widget format={format} allRecipesBool={allRecipesBool} 
                isLoading={isLoading} setIsLoading={setIsLoading}
                searchField={searchField} setSearchField={setSearchField}/>
}